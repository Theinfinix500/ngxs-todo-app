import { AddTodo } from './../state/todo.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent implements OnInit {
  selectedValue = '';
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.todoForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      completed: this.fb.control(false),
    });
  }

  saveTodo() {
    this.store.dispatch(new AddTodo(this.todoForm.value)).subscribe({
      complete: () => this.todoForm.reset({ title: '', completed: false }),
    });
  }
}
