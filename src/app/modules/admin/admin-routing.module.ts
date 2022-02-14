import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBooksComponent } from './components/add-edit-books/add-edit-books.component';
import { AddEditFlashcardsComponent } from './components/add-edit-flashcards/add-edit-flashcards.component';
import { AddEditTopicsComponent } from './components/add-edit-topics/add-edit-topics.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { ListFlashcardsComponent } from './components/list-flashcards/list-flashcards.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [

  { path: 'flashcards', component: ListFlashcardsComponent, data: { title: 'Tarjetas' } },
  { path: 'flashcards/add', component: AddEditFlashcardsComponent, data: { title: 'Agregar Tarjeta' } },
  { path: 'flashcards/edit/:id', component: AddEditFlashcardsComponent, data: { title: 'Editar Tarjeta' } },
  
  { path: 'topics', component: ListTopicsComponent, data: { title: 'Temas' } },
  { path: 'topics/add', component: AddEditTopicsComponent, data: { title: 'Agregar Tema' } },
  { path: 'topics/edit/:id', component: AddEditTopicsComponent, data: { title: 'Editar Tema' } },

  { path: 'books', component: ListBooksComponent, data: { title: 'Libros' } },
  { path: 'books/add', component: AddEditBooksComponent, data: { title: 'Agregar Libro' } },
  { path: 'books/edit/:id', component: AddEditBooksComponent, data: { title: 'Editar Libro' } },
  
  { path: 'users', component: ListUsersComponent, data: { title: 'Usuarios' } },
  { path: 'users/edit', component: EditUsersComponent, data: { title: 'Usuarios' } },

  { path: '', redirectTo: 'flashcards', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
