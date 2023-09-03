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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.usersService.findAll();
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
