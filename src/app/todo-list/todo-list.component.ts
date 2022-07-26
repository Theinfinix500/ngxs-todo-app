import { DeleteTodo, FetchAllTodos } from './../state/todo.actions';
import { TodoState, ITodo } from './../state/todo.state';
import { Todo } from './../models/todo.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  selectedValue = '';
  todos: Array<Todo> = [];
  @Select(TodoState.selectTodos) todos$: Observable<Array<ITodo>>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchAllTodos());
  }

  deleteTodo(todoId: string) {
    this.store.dispatch(new DeleteTodo(todoId));
  }
}
