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

export interface UpdateTodoInput {
  title: string;
  note: string;
  status: TodoStatus;
}
