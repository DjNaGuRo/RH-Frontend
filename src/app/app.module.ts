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
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './layouts/auth/auth.component';
import {MainComponent} from './layouts/main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {NotificationService} from "./services/notification.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    NotFoundComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, AuthService, UserService,NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
