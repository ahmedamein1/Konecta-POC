import { Component, OnInit, OnDestroy } from '@angular/core';
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
  ) {}

  ngOnInit(): void {

    this.subs.add(
      this.todosService.fetchLoading$.subscribe(isLoading => {
        this.fetchTodoLoading = isLoading;
      })
    );

    this.subs.add(
      this.todosService.activeTodosCount$.subscribe(count => {
        this.activeTodosCount = count;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
