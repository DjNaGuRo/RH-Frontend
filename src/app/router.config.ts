import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];
