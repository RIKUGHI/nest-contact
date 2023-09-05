import { HttpCode, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { WithPagination } from 'src/interfaces';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    page: number;
    q: string;
  }): Promise<WithPagination<User[]>> {
    const { page, q } = params;
    const take = 5;
    const skip = (page - 1) * take;

    const where: Prisma.UserWhereInput = {
      OR: [
        {
          name: {
            contains: q,
          },
        },
        {
          username: {
            contains: q,
          },
        },
      ],
    };

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        take,
        skip,
      }),
      this.prisma.user.count({
        where,
      }),
    ]);

    return {
      total: count,
      per_page: take,
      current_page: page,
      last_page: Math.ceil(count / take),
      data: users,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<null | User> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      return null;
    }

    return this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      return null;
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
