import { tap } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { DeleteTodo, AddTodo, FetchAllTodos } from './todo.actions';
import { patch } from '@ngxs/store/operators';

export interface ITodo {
  id: string;
  title: string;
}

export interface ITodoState {
  todos: ITodo[];
}

@State<ITodoState>({
  name: 'todos',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodoState implements NgxsOnInit {
  constructor(private _todoService: TodoService) {}

  @Selector()
  static selectTodos(state: ITodoState) {
    return state.todos;
  }

  ngxsOnInit(ctx?: StateContext<any> | undefined) {}

  @Action(AddTodo)
  add({ setState, getState }: StateContext<ITodoState>, { payload }: AddTodo) {
    const { todos } = getState();
    return this._todoService.addTodo(payload).pipe(
      tap((todos) => {
        setState(
          patch({
            todos: [...todos],
          })
        );
      })
    );
  }

  @Action(FetchAllTodos)
  getTodos({ patchState }: StateContext<ITodoState>) {
    return this._todoService.getTodos().pipe(
      tap((todos) => {
        patchState({
          todos,
        });
      })
    );
  }

  @Action(DeleteTodo)
  deleteTodo(
    { getState, patchState }: StateContext<ITodoState>,
    { id }: DeleteTodo
  ) {
    const state = getState();
    patchState({
      ...state,
      todos: state.todos.filter((item) => item.id !== id),
    });
  }
}
