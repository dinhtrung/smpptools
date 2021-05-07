import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { RouterModule } from '@angular/router';
import { routes } from './esme.routing';

// + application components
import { AccountsComponent } from './accounts/accounts.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { SmppPresetsComponent } from './smpp-presets/smpp-presets.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AccountsComponent,
    SessionsComponent,
    SessionDetailsComponent,
    SmppPresetsComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EsmeModule { }
