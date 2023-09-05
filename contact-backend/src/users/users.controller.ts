import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Query,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { ApiResponse, WithPagination } from 'src/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('test')
  // test(@Body() body, @Param() param, @Query() query) {
  //   return {
  //     body,
  //     param,
  //     query,
  //   };
  // }

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
      data: await this.usersService.findAll({ page, q }),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
