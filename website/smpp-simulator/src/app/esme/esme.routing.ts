import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { SmppPresetsComponent } from './smpp-presets/smpp-presets.component';
import { YamlResolve } from 'app/shared/util/yaml-resolve';
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
    path: 'sessions',
    component: SessionsComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    data: {
      yamlFile: 'esme/esme-account.yaml'
    },
    resolve: {
      config: YamlResolve
    }
  },
  {
    path: 'session-details/:id',
    component: SessionDetailsComponent
  },
  {
    path: 'smpp-presets',
    component: SmppPresetsComponent
  }
];
