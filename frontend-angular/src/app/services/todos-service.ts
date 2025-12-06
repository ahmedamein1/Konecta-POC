import { HttpClient } from "@angular/common/http";
import { Todo } from "../model/todo.model";
import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { API_URL } from "../config/api-endpoint";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  todos$ = new BehaviorSubject<Todo[]>([]);
  fetchLoading$ = new BehaviorSubject<boolean>(false);
  activeTodosCount$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  loadTodos() {
    this.fetchLoading$.next(true);
    this.http.get<{ todos: Todo[]; activeTodosNumber: number }>(API_URL)
      .subscribe({
        next: (res) => {
          this.todos$.next(res.todos || []);
          this.activeTodosCount$.next(res.activeTodosNumber ?? 0);
        },
        error: (err) => {
          console.error("Error fetching todos:", err);
          const backendMsg = err?.error?.message || "Unknown error occurred.";
          this.toastr.error(backendMsg, "Error");
        },
        complete: () => {
          this.fetchLoading$.next(false);
        }
      });
  }
}
