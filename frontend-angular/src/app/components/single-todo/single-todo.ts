import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TODO_STATUS_OPTIONS } from '../../config/todo-status-options';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos-service';
import { finalize } from 'rxjs';
import { TodoStatus } from '../../model/todo.model';
import { EditTodoContent } from "../edit-todo-content/edit-todo-content";

@Component({
  selector: 'app-single-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, EditTodoContent],
  templateUrl: './single-todo.html',
  styleUrls: ['./single-todo.css'],
})
export class SingleTodo {
  @Input() title!: string;
  @Input() note!: string;
  @Input() status!: string;
  @Input() todoId!: string;

  statusOptions = TODO_STATUS_OPTIONS;
  loading = false;
  editMode = false;

  constructor(private todosService: TodosService, private cdr: ChangeDetectorRef) {}

  handleDelete() {
    if (!this.todoId) return;

    this.loading = true;

    this.todosService
      .deleteTodo(this.todoId)
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

    this.loading = true;

    this.todosService
      .updateTodoStatus(this.todoId, newStatus)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  handleUpdateTodo(updated: any) {
    this.editMode = false;
  }
}
