export type TodoStatus = 'NEW' | 'IN-PROGRESS' | 'DONE';

export interface Todo {
  id: string;
  title: string;
  note: string;
  status: TodoStatus;
}

export interface CreateTodoInput {
  title: string;
  note: string;
}
