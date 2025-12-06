import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TODO_STATUS_OPTIONS } from '../../config/todo-status-options';

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
  @Input() status!: string;

  @Output() onCancel = new EventEmitter<void>();

  editTitle = '';
  editNote = '';
  editStatus: string = 'NEW';

  error = false;

  statusOptions = TODO_STATUS_OPTIONS;

  ngOnInit() {
    this.editTitle = this.title;
    this.editNote = this.note ?? '';
    this.editStatus = this.status;
  }

  handleUpdate() {
   
  }

  handleCancel() {
    this.onCancel.emit(); 
  }
}
