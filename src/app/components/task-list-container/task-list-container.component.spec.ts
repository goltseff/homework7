import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListContainerComponent } from './task-list-container.component';

describe('TaskListContainerComponent', () => {
  let component: TaskListContainerComponent;
  let fixture: ComponentFixture<TaskListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
