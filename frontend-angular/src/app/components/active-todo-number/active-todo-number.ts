import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TodosService } from '../../services/todos-service';

@Component({
  selector: 'app-active-todo-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-todo-number.html',
  styleUrls: ['./active-todo-number.css']
})
export class ActiveTodoNumber implements OnInit, OnDestroy {

  fetchTodoLoading!: boolean;
  activeTodosCount!: number;

  private subs = new Subscription();

  constructor(
    private todosService: TodosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.subs.add(
      this.todosService.fetchLoading$.subscribe(isLoading => {
        this.fetchTodoLoading = isLoading;
        this.cdr.detectChanges();
      })
    );

    this.subs.add(
      this.todosService.activeTodosCount$.subscribe(count => {
        this.activeTodosCount = count;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
