import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Todo from './types/todo';

let todos: Todo[] = [
  {
    id: 1,
    title: 'Learn TypeScript',
    description: 'The best programming language',
    completed: true,
  },
  {
    id: 2,
    title: 'Learn NestJS',
    description: 'The best framework',
    completed: false,
  },
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('/todos')
  getTodos(): Todo[] {
    return todos;
  }

}
