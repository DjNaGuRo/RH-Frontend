import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import {AuthDesactivateGuard} from "./guards/auth-desactivate.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent ,canActivate:[AuthDesactivateGuard]},
  { path: '**', component: NotFoundComponent },
];
