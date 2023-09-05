import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { Response } from 'express';
import { ApiResponse, WithPagination } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserModel>> {
    return {
      data: await this.usersService.create(createUserDto),
    };
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('q') q = '',
  ): Promise<ApiResponse<WithPagination<UserModel[]>>> {
    return {
      data: await this.usersService.users({ page, q }),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<UserModel>> {
    return {
      data: await this.usersService.user({ id }),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<boolean>> {
    const user = await this.usersService.update(+id, updateUserDto);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
    }

    return {
      data: user ? true : false,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.remove(+id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
    }

    return {
      data: user ? true : false,
    };
  }
}
