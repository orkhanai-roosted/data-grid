import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataGridControlsComponent } from './data-grid/data-grid-controls-row/data-grid-controls.component';
import { DataGridGroupedRowComponent } from './data-grid/data-grid-grouped-row/data-grid-grouped-row.component';
import { DataGridHeaderRowComponent } from './data-grid/data-grid-header-row/data-grid-header-row.component';
import { DataGridRowActionComponent } from './data-grid/data-grid-row-action/data-grid-row-action.component';
import { DataGridRowComponent } from './data-grid/data-grid-row/data-grid-row.component';
import { DataGridComponent } from './data-grid/data-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DataGridComponent,
    DataGridHeaderRowComponent,
    DataGridGroupedRowComponent,
    DataGridControlsComponent,
    DataGridRowComponent,
    DataGridRowActionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
