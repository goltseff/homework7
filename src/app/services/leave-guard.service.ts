import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TaskViewContainerComponent } from '../components/task-view-container/task-view-container.component';

@Injectable()
export class LeaveGuardService implements CanDeactivate<TaskViewContainerComponent> {

    canDeactivate(target: TaskViewContainerComponent) {
        if (!target.haschanges) {
            return window.confirm('Че правда решил уйти не через кнопочку сохранить???');
        }
        return true;
      }

}
