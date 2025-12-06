import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
}
