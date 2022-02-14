import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/spa-app/spa-app.module').then(m => m.SpaAppModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
