import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoService, ITodoItemData } from '../../services/todo.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html'
})
export class TaskItemComponent {

  @Input() todoitem: ITodoItemData;
  @Input() hidedelete: number;
  @Output() delTodo = new EventEmitter();
  @Output() editTodo = new EventEmitter();
  public statuses_dictionary = [];
  delTodoClk(p_todoid: string) {
    this.delTodo.emit(p_todoid);
  }
  editTodoClk(p_todoid: string) {
    this.editTodo.emit(p_todoid);
  }

  constructor(private todoService: ToDoService) { this.statuses_dictionary = this.todoService.statuses_dictionary; }


}
