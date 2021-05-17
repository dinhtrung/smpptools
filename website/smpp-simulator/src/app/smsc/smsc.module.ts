import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'smsc-instance',
        data: { pageTitle: 'smpptoolsApp.smscInstance.home.title' },
        loadChildren: () => import('./smsc-instance/smsc-instance.module').then(m => m.SmscInstanceModule),
      },
      {
        path: 'smsc-account',
        data: { pageTitle: 'smpptoolsApp.smscAccount.home.title' },
        loadChildren: () => import('./smsc-account/smsc-account.module').then(m => m.SmscAccountModule),
      },
      {
        path: 'smsc-session',
        data: { pageTitle: 'smpptoolsApp.smscSession.home.title' },
        loadChildren: () => import('./smsc-session/smsc-session.module').then(m => m.SmscSessionModule),
      }
    ]),
  ],
})
export class SmscModule { }
