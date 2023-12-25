import { Component } from '@angular/core';

import { COLUMNS } from './data/columns';
import { REQUESTS } from './data/requests';
import { ROW_ACTIONS } from './data/row-actions';
import { GROUP_BY_OPTIONS } from './data/group-by-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  columns = COLUMNS;
  data = REQUESTS;
  rowActions = ROW_ACTIONS;

  groupBy = GROUP_BY_OPTIONS[0];
  sortBy = this.columns.slice(1, 3);
}
