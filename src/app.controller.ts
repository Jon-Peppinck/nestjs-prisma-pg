import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { AppService } from './app.service';
import { PostTodoDTO } from './PostTodo.dto';
import { Todo as ITodo } from './Todo.model';
import { UpdateTodoDTO } from './UpdateTodo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('todo')
  async postTodo(@Body() postTodoDTO: PostTodoDTO): Promise<ITodo> {
    return this.appService.postTodo(postTodoDTO);
  }

  @Get('todo')
  async getTodos(): Promise<{ todos: ITodo[] }> {
    const todos = await this.appService.getTodos();
    return { todos: todos };
  }

  @Put('todo/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDTO: UpdateTodoDTO,
  ): Promise<ITodo> {
    const updatedTodo = await this.appService.updateTodo(
      parseInt(id),
      updateTodoDTO,
    );
    return updatedTodo;
  }

  @Delete('todo/:id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ id: number; message: string }> {
    const idInt = parseInt(id);
    await this.appService.deleteTodo(idInt);
    return {
      id: idInt,
      message: 'Success: deleted todo',
    };
  }
}
