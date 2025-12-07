import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { TODO_STATUS_OPTIONS } from '../../config/todo-status-options';
import { TodosService } from '../../services/todos-service';
import { EditTodoContent } from "../edit-todo-content/edit-todo-content";

@Component({
  selector: 'app-single-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, EditTodoContent],
  templateUrl: './single-todo.html',
  styleUrls: ['./single-todo.css'],
})
export class SingleTodo implements OnInit {

  @Input() title!: string;
  @Input() note!: string;
  @Input() status!: string;
  @Input() todoId!: string;

  statusOptions = TODO_STATUS_OPTIONS;
  loading = false;
  editMode = false;

  originalStatus!: string;

  constructor(
    private todosService: TodosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.originalStatus = this.status;
  }

  handleDelete() {
    if (!this.todoId) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.todosService.deleteTodo(this.todoId)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  handleStatusChange(event: any) {
    const newStatus = event.target.value;
    const previousStatus = this.originalStatus;

    this.loading = true;
    this.cdr.detectChanges();

    this.todosService.updateTodoStatus(this.todoId, newStatus)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.originalStatus = newStatus;
        },
        error: () => {
          this.status = previousStatus; 
          this.cdr.detectChanges();
        }
      });
  }

  handleUpdateTodo(updated: any) {
    this.editMode = false;
  }
}
