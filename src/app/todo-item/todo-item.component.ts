import { ITodo } from './../state/todo.state';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo;
  @Output() onDeleteTodo: EventEmitter<string> = new EventEmitter();

  selectedValue = '';
  constructor() {}

  ngOnInit(): void {}

  deleteTodo() {
    this.onDeleteTodo.emit(this.todo.id);
  }
}
