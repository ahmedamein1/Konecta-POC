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

  todos = []
  

  get filteredTodos() {
  
    return []
  }

  get isEmpty() {
    return this.filteredTodos.length === 0;
  }
}
