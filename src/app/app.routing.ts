import { Routes, RouterModule } from "@angular/router";

import { ServerInfoComponent } from "./server-info/server-info.component";
import { MyTasksComponent } from "./tasks/my-tasks/my-tasks.component";
import { TaskDetailsComponent } from "./tasks/task-details/task-details.component";
import { AuthGuard } from "./shared/auth.guard";
import { LoginComponent } from "./login/login.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/server-info', pathMatch: 'full' },
    { path: 'server-info', component: ServerInfoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'task-details', component: TaskDetailsComponent, canActivate: [AuthGuard] },
    { path: 'my-tasks', component: MyTasksComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(APP_ROUTES, { useHash: true }); // Support for Browser Refresh
