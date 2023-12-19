import { Component } from '@angular/core';
import { COLUMNS } from './data/columns';
import { REQUESTS } from './data/requests';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  columns = COLUMNS;
  data = REQUESTS;
}
