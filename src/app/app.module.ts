import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ServerInfoComponent } from './server-info/server-info.component';
import { routing } from './app.routing';
import { HttpService } from "./services/http.service";
import { KeysPipe, KeyValuePipe } from './pipes/keys.pipe';
import { MyTasksComponent } from './tasks/my-tasks/my-tasks.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { CircleProgressComponent } from './tasks/circle-progress/circle-progress.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./shared/auth.guard";
import { AuthService } from "./services/auth.service";
import { AlertService } from "./services/alert.service";
import { AlertComponent } from "./directives/alert.component";
import { Epoch2datePipe } from './pipes/epoch2date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ServerInfoComponent,
    KeysPipe, KeyValuePipe, 
    MyTasksComponent,
    TaskDetailsComponent,
    CircleProgressComponent,
    LoginComponent,
    AlertComponent,
    Epoch2datePipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [
    HttpService,
    AuthGuard,
    AuthService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
