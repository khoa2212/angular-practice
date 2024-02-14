import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'app/app-routing.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent, NotFoundComponent } from './components';

@NgModule({
  imports: [
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  declarations: [HeaderComponent, NotFoundComponent],
  exports: [HeaderComponent, NotFoundComponent],
})
export class SharedModule {}
