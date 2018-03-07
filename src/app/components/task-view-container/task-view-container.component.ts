import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { ToDoService, ITodoItemData } from '../../services/todo.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

interface ITagsChecked {
  checked: boolean;
  name: string;
}

@Component({
  selector: 'app-task-view-container',
  templateUrl: './task-view-container.component.html'
})
export class TaskViewContainerComponent implements OnInit {
  public itemId;
  public isNew = false;
  public todoitem: ITodoItemData;
  public edited_tags: ITagsChecked[] = [];
  private tags: string[] = [];
  public statuses_dictionary = [];
  public items: ITodoItemData[] = [];
  public haschanges = false;
  public editForm: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private todoService: ToDoService,
    private formBuilder: FormBuilder
  ) {
    this.todoService.loadItemsFromLS();
    this.statuses_dictionary = this.todoService.statuses_dictionary;
    this.items = this.todoService.items;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initComponent();
      }
    });


  }

  private initComponent() {
    if (this.activatedRoute.snapshot.paramMap.get('id') === 'new') { this.isNew = true; }
    this.itemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), null);
    if (isNaN(this.itemId)) { this.itemId = 0; }
    // проверяем есть ли такой таск и если нет - редиректим на лист
    if (!this.isNew && !this.todoService.isExists(this.itemId)) {
      console.log('task not found');
      this.router.navigate(['/list']);
    }
    this.todoitem = {
      id: 0,
      desc: '',
      name: '',
      status: 0,
      tags: [],
      type: ''
    };

    if (this.itemId > 0) {
      this.todoitem.id = this.itemId;
      this.todoitem = this.todoService.getItemByID(this.todoitem.id);
    }
    this.editForm = this.formBuilder.group({
      name: [this.todoitem.name, [Validators.required]],
      dscr: [this.todoitem.desc, [Validators.required]],
      status: [this.todoitem.status, [Validators.required]],
      tags: [this.todoitem.tags]
    });
  }

  ngOnInit() {
    this.initComponent();



  }



  updateCheckboxes(event) {
    const name: string = event.target.id.substring(3);
    this.edited_tags.forEach(function (value, index) {
      if (value.name === name) {
        if (event.target.checked) { value.checked = true; } else { value.checked = false; }
      }
    });
  }

  saveTodo() {
    this.haschanges = true;
    let error = '';
    const checked_tags = [];
    if (!this.editForm.valid) { error = 'форма не валидна'; }

    if (error === '') {
      this.edited_tags.forEach(function (value, index) {
        if (value.checked === true) { checked_tags.push(value.name); }
        value.checked = false;
      });
      if (this.isNew) { this.todoitem.id = Date.now(); }
      this.todoitem.name = this.editForm.controls.name.value;
      this.todoitem.desc = this.editForm.controls.dscr.value;
      this.todoitem.status = parseInt(this.editForm.controls.status.value, null);
      this.todoitem.tags = this.editForm.controls.tags.value;
      this.todoService.setItem(this.todoitem);
      this.router.navigate(['/list']);
    } else {
      alert(error);
    }

  }
  onSubmit(e) {
    this.saveTodo();
  }

}
