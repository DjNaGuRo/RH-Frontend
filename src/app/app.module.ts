import {NotificationModule} from './notification.module';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NotificationService} from "./services/notification.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthDesactivateGuard} from "./guards/auth-desactivate.guard";
import { HistoComponent } from './pages/histo/histo.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    HistoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [AuthGuard,AuthDesactivateGuard ,AuthService, UserService,NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
