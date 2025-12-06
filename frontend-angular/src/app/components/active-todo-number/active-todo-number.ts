import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-todo-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-todo-number.html',
  styleUrls: ['./active-todo-number.css']
})
export class ActiveTodoNumber {
  fetchTodoLoading = false;
  activeTodosCount = 0;
}
