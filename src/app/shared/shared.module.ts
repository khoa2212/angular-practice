import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'app/app-routing.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  HeaderComponent,
  NotFoundComponent,
  LoadingComponent,
  AssignmentTableComponent,
  RelativeTableComponent,
} from './components';

@NgModule({
  imports: [
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    LoadingComponent,
    AssignmentTableComponent,
    RelativeTableComponent,
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent,
    LoadingComponent,
    AssignmentTableComponent,
    RelativeTableComponent,
  ],
})
export class SharedModule {}
