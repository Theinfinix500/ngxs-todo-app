import { ITodo } from './todo.state';
import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private static readonly responseDelay = 0;
  private _refreshTodos: Subject<boolean> = new Subject();
  refreshTodos = this._refreshTodos.asObservable();
  todos: ITodo[] = [
    {
      id: '1',
      title: 'Subscribe to blog ;)',
    },
    {
      id: '2',
      title: 'Buy food',
    },
  ];

  constructor() {}

  refreshTodoList() {
    this._refreshTodos.next(true);
  }

  getTodos(): Observable<Array<ITodo>> {
    return of(this.todos).pipe(delay(TodoService.responseDelay));
  }

  addTodo(todo: ITodo) {
    this.todos = [
      ...this.todos,
      { ...todo, id: Math.random().toString(36).substring(7) },
    ];
    return of([...this.todos]).pipe(delay(TodoService.responseDelay));
  }

  deleteTodo(todoId: string) {
    return of([...this.todos.filter((item) => item.id !== todoId)]).pipe(
      delay(TodoService.responseDelay)
    );
  }
}
