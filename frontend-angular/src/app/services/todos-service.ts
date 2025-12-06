import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { API_URL } from '../config/api-endpoint';
import { CreateTodoInput, Todo, TodoStatus } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  fetchLoading$ = new BehaviorSubject<boolean>(false);
  activeTodosCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  loadTodos() {
    this.fetchLoading$.next(true);

    this.http.get<{ todos: Todo[]; activeTodosNumber: number }>(API_URL).subscribe({
      next: (res) => {
        this.todos$.next(res.todos || []);
        this.activeTodosCount$.next(res.activeTodosNumber ?? 0);
      },
      error: (err) => {
        const backendMsg = err?.error?.message || 'Unknown error occurred.';
        this.toastr.error(backendMsg, 'Error');
      },
      complete: () => {
        this.fetchLoading$.next(false);
      },
    });
  }

  deleteTodo(id: string) {
    return this.http
      .delete<{ message: string; deletedTodo: Todo }>(`${API_URL}/${id}`)
      .pipe(
        tap((res) => {
          const updated = this.todos$.value.filter((t) => t.id !== id);
          this.todos$.next(updated);

          const activeCount = updated.filter((t) => t.status !== 'DONE').length;
          this.activeTodosCount$.next(activeCount);

          this.toastr.success(res.message || 'Todo deleted successfully.');
        }),
        catchError((err) => {
          const backendMsg = err?.error?.message || 'Unknown error occurred.';
          this.toastr.error(backendMsg, 'Error');
          throw err;
        })
      );
  }

  createTodo(todoData: CreateTodoInput) {
    return this.http
      .post<{ message: string; todo: Todo }>(API_URL, todoData)
      .pipe(
        tap((res) => {
          const updated = [...this.todos$.value, res.todo];
          this.todos$.next(updated);

          const activeCount = updated.filter((t) => t.status !== 'DONE').length;
          this.activeTodosCount$.next(activeCount);

          this.toastr.success(res.message || 'Todo created successfully');
        }),
        catchError((err) => {
          const backendMsg = err?.error?.message || 'Unknown error occurred.';
          this.toastr.error(backendMsg, 'Error');
          throw err;
        })
      );
  }

  updateTodoStatus(id: string, status: TodoStatus) {
    return this.http
      .patch<{ message: string; todo: Todo }>(`${API_URL}/${id}/status`, { status })
      .pipe(
        tap((res) => {
          const updatedList = this.todos$.value.map((t) =>
            t.id === id ? { ...t, status: res.todo.status } : t
          );

          this.todos$.next(updatedList);

          const activeCount = updatedList.filter((t) => t.status !== 'DONE').length;
          this.activeTodosCount$.next(activeCount);

          this.toastr.success(res.message || 'Status updated successfully');
        }),
        catchError((err) => {
          const backendMsg = err?.error?.message || 'Unknown error occurred.';
          this.toastr.error(backendMsg, 'Error');
          throw err;
        })
      );
  }
}
