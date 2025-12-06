import { Component, Input, OnInit } from '@angular/core';
import { TODO_STATUS_OPTIONS } from '../../config/todo-status-options';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-todo.html',
  styleUrls: ['./single-todo.css']
})
export class SingleTodo  {

  @Input() title!: string;
  @Input() note!: string;
  @Input() status!: string;    

  statusOptions = TODO_STATUS_OPTIONS;     
}
