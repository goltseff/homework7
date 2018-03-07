import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewContainerComponent } from './task-view-container.component';

describe('TaskViewContainerComponent', () => {
  let component: TaskViewContainerComponent;
  let fixture: ComponentFixture<TaskViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
