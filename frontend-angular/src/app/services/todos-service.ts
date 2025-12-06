import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo.model';
import { API_URL } from '../config/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  private API_URL = API_URL;

  todos$ = new BehaviorSubject<Todo[]>([]);
  activeTodosCount$ = new BehaviorSubject<number>(0);
  fetchTodoLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
}
