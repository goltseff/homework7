import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsControlComponent } from './tags-control.component';

describe('TagsControlComponent', () => {
  let component: TagsControlComponent;
  let fixture: ComponentFixture<TagsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
