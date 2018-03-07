import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-tags-control',
  templateUrl: './tags-control.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TagsControlComponent), multi: true}
  ]
})
export class TagsControlComponent implements OnInit, ControlValueAccessor  {

  public tags: string[] = [];
  propagateChange: (any) => void;
  propagateTouch: (any) => void;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value) {
    this.tags = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouch = fn;
  }

  add_tag(p_name) {
    if (p_name.value !== '') {
      this.tags.push(p_name.value);
      p_name.value = '';
    }
  }
  del_tag(p_name: string) {
   // console.log(p_name);
   let del_index = 0;
   this.tags.forEach(function (value, index) {
       if (value === p_name) { del_index = index; }
   });
   this.tags.splice(del_index, 1);

  }

  get value(): string[] {
    return this.tags;
  }

}
