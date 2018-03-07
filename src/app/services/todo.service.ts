import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ITodoItemData {
    id: number;
    name: string;
    desc: string;
    tags: string[];
    status: number;
    type: string;
}

@Injectable()
export class ToDoService {
    public items: ITodoItemData[] = [];
    private _todos$$ = new BehaviorSubject(this.items);

    public statuses_dictionary = [
        'новый', 'в работе', 'выполнен', 'отложен'
    ];
    constructor() {
        this.loadItemsFromLS();
    }


    public getTodos() {
        return this._todos$$.asObservable();
    }

    public loadItemsFromLS() {
        const tmp_items: ITodoItemData[] = [];
        const storedKeys = Object.keys(localStorage);
        storedKeys.forEach(function (value, index) {
            if (localStorage.getItem(value.toString()).indexOf('"type":"todoiteminlocalstorage"') > -1) {
                const item: ITodoItemData = JSON.parse(localStorage.getItem(value.toString()));
                tmp_items.push(item);
            }
        });
        this.items = tmp_items;
        this._todos$$.next(this.items);
    }
    isExists(p_id: number) {
        let result = false;
        this.items.forEach(function (value, index) {
            if (value.id === p_id) { result = true; }
        });
        return result;
    }
    setItem(item: ITodoItemData) {
        item.type = 'todoiteminlocalstorage';
        localStorage.setItem(item.id.toString(), JSON.stringify(item));
        this.loadItemsFromLS();
    }

    removeItem(id: number) {
        let user_del_index = 0;
        localStorage.removeItem(id.toString());
        this.items.forEach(function (value, index) {
            if (value.id === id) { user_del_index = index; }
        });
        // this.items.splice(user_del_index, 1);
        this.loadItemsFromLS();
    }
    getItemByID(p_id: number): ITodoItemData {
        return JSON.parse(localStorage.getItem(p_id.toString()));
    }


}
