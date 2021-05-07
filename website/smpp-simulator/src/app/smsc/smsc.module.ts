import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { RouterModule } from '@angular/router';
import { routes } from './smsc.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstancesComponent } from './instances/instances.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { SessionsComponent } from './sessions/sessions.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InstancesComponent,
    ProfilesComponent,
    SessionsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SmscModule { }
