import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosContainer } from '../todos-container/todos-container';
import { CreateTodo } from '../create-todo/create-todo';
import { ActiveTodoNumber } from '../active-todo-number/active-todo-number';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [CommonModule, TodosContainer, CreateTodo, ActiveTodoNumber],
  templateUrl: './app-layout.html',
  styleUrls: ['./app-layout.css']
})
export class AppLayout {}
