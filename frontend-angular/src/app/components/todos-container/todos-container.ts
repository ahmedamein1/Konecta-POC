import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SingleTodo } from '../single-todo/single-todo';

@Component({
  selector: 'app-todos-container',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleTodo],
  templateUrl: './todos-container.html',
  styleUrls: ['./todos-container.css']
})
export class TodosContainer {
  filter = 'ALL';
  fetchTodoLoading = false;

  todos = [
    { id: 1, title: 'Todo One', note: 'Note One', status: 'NEW' },
    { id: 2, title: 'Todo Two', note: 'Note Two', status: 'IN-PROGRESS' },
    { id: 3, title: 'Todo Three', note: 'Note Three', status: 'DONE' }
  ];

  get filteredTodos() {
    if (this.filter === 'ALL') return this.todos;
    return this.todos.filter(t => t.status === this.filter);
  }

  get isEmpty() {
    return this.filteredTodos.length === 0;
  }
}
