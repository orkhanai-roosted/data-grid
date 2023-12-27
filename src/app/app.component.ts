import { Component } from '@angular/core';

import { COLUMNS } from './data/columns';
import { REQUESTS } from './data/requests';
import { ROW_ACTIONS } from './data/row-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  columns = COLUMNS;
  // data = REQUESTS;
  data = [];
  rowActions = ROW_ACTIONS;
}
