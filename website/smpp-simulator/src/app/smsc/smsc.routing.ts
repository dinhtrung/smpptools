import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstancesComponent } from './instances/instances.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { SessionsComponent } from './sessions/sessions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'instances',
    component: InstancesComponent
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  },
  {
    path: 'sessions',
    component: SessionsComponent
  }
];
