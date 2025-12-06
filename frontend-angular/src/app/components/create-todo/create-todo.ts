import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos-service';
import { finalize } from 'rxjs';
import { CreateTodoInput } from '../../model/todo.model';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-todo.html',
  styleUrls: ['./create-todo.css']
})
export class CreateTodo {
  title = '';
  note = '';
  loading = false;
  error = false;

  constructor(private todosService: TodosService) {}

  handleCreate() {
    if (!this.title.trim()) {
      this.error = true;
      return;
    }

    this.error = false;
    this.loading = true;

    const newTodo: CreateTodoInput = {
      title: this.title,
      note: this.note
    };

    this.todosService.createTodo(newTodo)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(() => {
        this.title = '';
        this.note = '';
      });
  }
}
