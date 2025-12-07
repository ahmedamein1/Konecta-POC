import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { TodosService } from '../../services/todos-service';
import { SingleTodo } from '../single-todo/single-todo';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'app-todos-container',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleTodo],
  templateUrl: './todos-container.html',
  styleUrls: ['./todos-container.css'],
})
export class TodosContainer implements OnInit {
  filter = 'ALL';

  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private todosService: TodosService) {
    this.todos$ = this.todosService.todos$;
    this.loading$ = this.todosService.fetchLoading$;
  }

  ngOnInit(): void {
    this.todosService.loadTodos();
  }

  get filteredTodos$() {
    return this.todos$.pipe(
      map((todos: Todo[]) => {
        if (this.filter === 'ALL') return todos;
        return todos.filter((t) => t.status === this.filter);
      })
    );
  }

  get isEmpty$() {
    return this.filteredTodos$.pipe(map((list) => list.length === 0));
  }

  updateFilter(newFilter: string) {
    this.filter = newFilter;
  }
}
