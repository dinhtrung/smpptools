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
      }
    ]),
  ],
})
export class SmscModule { }
