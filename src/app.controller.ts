import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { PostTodoDTO } from './PostTodo.dto';
import { Todo as ITodo } from './Todo.model';

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
}
