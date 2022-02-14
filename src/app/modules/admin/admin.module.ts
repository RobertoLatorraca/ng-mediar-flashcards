import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddEditFlashcardsComponent } from './components/add-edit-flashcards/add-edit-flashcards.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { AddEditTopicsComponent } from './components/add-edit-topics/add-edit-topics.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFlashcardsComponent } from './components/list-flashcards/list-flashcards.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { AddEditBooksComponent } from './components/add-edit-books/add-edit-books.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import localeEsAr from '@angular/common/locales/es-AR';
import { EditUsersComponent } from './components/edit-users/edit-users.component';

registerLocaleData(localeEsAr, 'es-AR');

@NgModule({
  declarations: [
    ListFlashcardsComponent,
    AddEditFlashcardsComponent,
    ListTopicsComponent,
    AddEditTopicsComponent,
    ListUsersComponent,
    ListBooksComponent,
    AddEditBooksComponent,
    EditUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    EditorModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ]
})
export class AdminModule { }
