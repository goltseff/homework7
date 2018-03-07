import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ITodoItemData } from '../services/todo.service';
import { filter, map, switchMap } from 'rxjs/operators';

export interface IFiltersModel {
  id: number;
  name: string;
  status: number;
  tags: string[];
}

@Injectable()
export class TodofilterengineService {

  private _filter$$ = new BehaviorSubject(null);
  private filterValue: IFiltersModel;
  public updateFilter(newFilterValue: IFiltersModel) {
    this.filterValue = newFilterValue;
    this._filter$$.next(newFilterValue);
  }
  public filter(p_todos: Observable<ITodoItemData[]>): Observable<ITodoItemData[]> {
    return this._filter$$.pipe(
      switchMap((filtermodel: IFiltersModel) => this.filter_int(p_todos, filtermodel))
    );
  }

  private filter_int(p_todos: Observable<ITodoItemData[]>, p_filter: IFiltersModel): Observable<ITodoItemData[]> {
    return p_todos.pipe(
      map((todos: ITodoItemData[]) =>
        todos.filter(todo => (this.filterValue.name === '') ? true : todo.name === p_filter.name))
      , map((todos: ITodoItemData[]) =>
        todos.filter(todo => (this.filterValue.id === 0) ? true : todo.id === p_filter.id))
      , map((todos: ITodoItemData[]) =>
        todos.filter(todo => (this.filterValue.status === -1) ? true : todo.status === p_filter.status))
    );

  }

}
