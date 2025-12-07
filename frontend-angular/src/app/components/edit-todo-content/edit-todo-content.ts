import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TODO_STATUS_OPTIONS } from '../../config/todo-status-options';
import { TodoStatus, UpdateTodoInput } from '../../model/todo.model';

@Component({
  selector: 'app-edit-todo-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-todo-content.html',
  styleUrls: ['./edit-todo-content.css']
})
export class EditTodoContent {

  @Input() title!: string;
  @Input() note: string = '';
  @Input() status!: TodoStatus;

  @Output() onCancel = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<UpdateTodoInput>();

  editTitle = '';
  editNote = '';
  editStatus: TodoStatus = 'NEW';

  error = false;

  statusOptions = TODO_STATUS_OPTIONS;

  ngOnInit() {
    this.editTitle = this.title;
    this.editNote = this.note ?? '';
    this.editStatus = this.status;
  }

  handleUpdate() {
    console.log("ss")
    if (!this.editTitle.trim()) {
      this.error = true;
      return;
    }

    this.error = false;

    const updatedTodo: UpdateTodoInput = {
      title: this.editTitle.trim(),
      note: this.editNote.trim(),
      status: this.editStatus
    };

    this.onUpdate.emit(updatedTodo);
  }

  handleCancel() {
    this.onCancel.emit();
  }
}
