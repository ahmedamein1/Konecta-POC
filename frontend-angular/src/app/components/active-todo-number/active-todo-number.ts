import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TodosService } from '../../services/todos-service';

@Component({
  selector: 'app-active-todo-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-todo-number.html',
  styleUrls: ['./active-todo-number.css'],
})
export class ActiveTodoNumber {

  fetchTodoLoading$: Observable<boolean>;
  activeTodosCount$: Observable<number>;

  constructor(private todosService: TodosService) {
    this.fetchTodoLoading$ = this.todosService.fetchLoading$;
    this.activeTodosCount$ = this.todosService.activeTodosCount$;
  }
}
