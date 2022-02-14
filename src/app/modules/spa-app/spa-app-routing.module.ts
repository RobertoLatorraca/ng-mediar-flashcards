import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestConfigComponent } from './components/test-config/test-config.component';
import { RunFlashcardComponent } from './components/run-flashcard/run-flashcard.component';
import { SpaHomeComponent } from './components/spa-home/spa-home.component';

const routes: Routes = [

  {
    path: '',
    component: SpaHomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Tablero' } },
      { path: 'test/config', component: TestConfigComponent, data: { title: 'Tarjetas (configurá tu test)' } },
      { path: 'run-flashcard', component: RunFlashcardComponent },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaAppRoutingModule { }
