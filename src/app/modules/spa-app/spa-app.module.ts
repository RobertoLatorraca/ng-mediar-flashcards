import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaAppRoutingModule } from './spa-app-routing.module';
import { SpaHomeComponent } from './components/spa-home/spa-home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestConfigComponent } from './components/test-config/test-config.component';
import { RunFlashcardComponent } from './components/run-flashcard/run-flashcard.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { UserPrincipalComponent } from 'src/app/shared/user-principal/user-principal.component';
import { BreadcrumbComponent } from 'src/app/shared/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SpaHomeComponent,
    NavbarComponent,
    DashboardComponent,
    TestConfigComponent,
    RunFlashcardComponent,
    UserPrincipalComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    SpaAppRoutingModule,
    FormsModule
  ]
})
export class SpaAppModule { }
