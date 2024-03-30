import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PostTodoDTO } from './PostTodo.dto';
import { Todo as ITodo } from './Todo.model';
import { UpdateTodoDTO } from './UpdateTodo.dto';

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

  async updateTodo(
    todoId: number,
    updateTodoDTO: UpdateTodoDTO,
  ): Promise<ITodo | null> {
    const existingTodo = await this.prismaService.todo.findUnique({
      where: { id: todoId },
    });
    if (!existingTodo) {
      throw new NotFoundException(`Todo with id ${todoId} not found`);
    }

    const updatedTodo = await this.prismaService.todo.update({
      where: { id: todoId },
      data: updateTodoDTO,
    });

    return updatedTodo;
  }

  async deleteTodo(todoId: number): Promise<void> {
    const existingTodo = await this.prismaService.todo.findUnique({
      where: { id: todoId },
    });
    if (!existingTodo) {
      throw new NotFoundException(`Todo with id ${todoId} not found`);
    }

    await this.prismaService.todo.delete({ where: { id: todoId } });
  }
}
