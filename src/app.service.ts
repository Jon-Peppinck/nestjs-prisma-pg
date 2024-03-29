import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PostTodoDTO } from './PostTodo.dto';
import { Todo as ITodo } from './Todo.model';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async postTodo(postTodoDTO: PostTodoDTO): Promise<ITodo> {
    const todo = await this.prismaService.todo.create({
      data: postTodoDTO,
    });
    return todo;
  }

  async getTodos(): Promise<ITodo[]> {
    const todoList: ITodo[] = await this.prismaService.todo.findMany();
    return todoList;
  }
}
