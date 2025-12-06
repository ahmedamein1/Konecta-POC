import { Component, signal } from '@angular/core';

import { ActiveTodoNumber } from "./components/active-todo-number/active-todo-number";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [ActiveTodoNumber]
})
export class App {

}
