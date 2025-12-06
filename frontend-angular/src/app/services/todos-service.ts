import { HttpClient } from "@angular/common/http";
import { Todo } from "../model/todo.model";
import { BehaviorSubject, catchError, finalize, tap } from "rxjs";
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


  deleteTodo(id: string) {
  return this.http
    .delete<{ message: string; activeTodosNumber: number }>(`${API_URL}/${id}`)
    .pipe(
      tap((res) => {
        const updated = this.todos$.value.filter(t => t.id !== id);
        this.todos$.next(updated);

        if (res?.activeTodosNumber !== undefined) {
          this.activeTodosCount$.next(res.activeTodosNumber);
        }

        this.toastr.success("Todo deleted successfully.");
      }),
      catchError((err) => {
        const backendMsg = err?.error?.message || "Unknown error occurred.";
        this.toastr.error(backendMsg, "Error");
        throw err; 
      })
    );
}

}
