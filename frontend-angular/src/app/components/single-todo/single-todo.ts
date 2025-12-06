import { Component } from '@angular/core';
import { TODO_STATUS_OPTIONS } from '../../config/todo-status-options';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './single-todo.html',
  styleUrl: './single-todo.css',
})
export class SingleTodo {
  statusOptions = TODO_STATUS_OPTIONS;
  currentStatus = "NEW"; 

}
