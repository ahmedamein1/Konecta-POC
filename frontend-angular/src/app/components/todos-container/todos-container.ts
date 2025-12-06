import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TodosService } from '../../services/todos-service';
import { Todo } from '../../model/todo.model';
import { SingleTodo } from '../single-todo/single-todo';

@Component({
  selector: 'app-todos-container',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleTodo],
  templateUrl: './todos-container.html',
  styleUrls: ['./todos-container.css'],
})
export class TodosContainer implements OnInit, OnDestroy {
  
  todos: Todo[] = [];
  fetchLoading: boolean = false;
  filter: string = 'ALL';

  private subs = new Subscription();

  constructor(
    private todosService: TodosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subs.add(
      this.todosService.todos$.subscribe((list) => {
        this.todos = list;
        this.cdr.detectChanges();
      })
    );

    
    this.subs.add(
      this.todosService.fetchLoading$.subscribe((isLoading) => {
        this.fetchLoading = isLoading;
        this.cdr.detectChanges();
      })
    );

    this.todosService.loadTodos();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  get filteredTodos(): Todo[] {
    if (!this.todos) return [];
    if (this.filter === 'ALL') return this.todos;
    return this.todos.filter(todo => todo.status === this.filter);
  }

  get isEmpty(): boolean {
    return this.filteredTodos.length === 0;
  }
}
