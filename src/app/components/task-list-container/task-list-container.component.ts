import { Component, OnInit } from '@angular/core';
import { ToDoService, ITodoItemData } from '../../services/todo.service';
import { TodofilterengineService, IFiltersModel } from '../../services/todofilterengine.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-list-container',
  templateUrl: './task-list-container.component.html'
})
export class TaskListContainerComponent implements OnInit {
  public items: ITodoItemData[] = [];
  public statuses_dictionary: string[] = [];
  public filterForm: FormGroup;

  constructor(
    private todoService: ToDoService,
    private todofilterengineService: TodofilterengineService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    // подпишемся на сервис
    this.todoService.getTodos().subscribe((v) => {
      this.items = v;
    });

    this.statuses_dictionary = this.todoService.statuses_dictionary;
    this.statuses_dictionary.push('любой');

    this.filterForm = this.formBuilder.group({
      id: [''],
      name: [''],
      tags: [[]],
      status: [this.statuses_dictionary.length - 1]
    });


  }
  delTodo(e: string) {
    const tmpint = parseInt(e, null);
    this.todoService.removeItem(tmpint);
    // this.items = this.todoService.items;
  }
  editTodo(e: string) {
    this.router.navigate(['/list/' + e]);
  }
  addTodo() {
    this.router.navigate(['/list/new']);
  }
  todosFilter() {
    let tmp_id = parseInt(this.filterForm.controls.id.value, null);
    if (isNaN(tmp_id)) { tmp_id = 0; }
    let tmp_id2 = parseInt(this.filterForm.controls.status.value, null);
    if (isNaN(tmp_id2)) { tmp_id2 = -1; }
    if (tmp_id2 >= (this.statuses_dictionary.length - 1)) { tmp_id2 = -1; }

    const filter: IFiltersModel = {
      id: tmp_id,
      name: this.filterForm.controls.name.value,
      status: tmp_id2,
      tags: this.filterForm.controls.tags.value
    };
    this.todofilterengineService.updateFilter(filter);
    this.todofilterengineService.filter(this.todoService.getTodos()).subscribe((v) => {
      this.items = v;
    });
  }


  /*
  todosFilter() {
    console.log('filter');
    const filter_name = this.filterForm.controls.name.value;
    let filter_id = parseInt(this.filterForm.controls.id.value, null);
    let tags_arr: string[] = [];
    tags_arr = this.filterForm.controls.tags.value;

    if (isNaN(filter_id)) { filter_id = 0; }
    this.todoService.loadItemsFromLS();
    this.items = this.todoService.items;
    const filtered_items = [];
    this.items.forEach(function (value) {
      let can_add = true;
      if (filter_id !== 0 && filter_id !== value.id) { can_add = false; }
      if (filter_name !== '' && filter_name !== value.name) { can_add = false; }
      tags_arr.forEach(element => {
        can_add = false;
        if (value.tags.indexOf(element) !== -1) { can_add = true; }
      });

      if (can_add) { filtered_items.push(value); }
    });
    this.items = filtered_items;
  }
*/
  clear_filter() {
    this.filterForm.controls.name.setValue('');
    this.filterForm.controls.id.setValue('');
    this.filterForm.controls.status.setValue(this.statuses_dictionary.length - 1);
    this.filterForm.controls.tags.setValue([]);
    this.todosFilter();
  }

}
