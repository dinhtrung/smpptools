import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'base-sm',
        data: { pageTitle: 'smpptoolsApp.baseSm.home.title' },
        loadChildren: () => import('./base-sm/base-sm.module').then(m => m.BaseSmModule),
      },
      {
        path: 'isdn-list',
        data: { pageTitle: 'smpptoolsApp.isdnList.home.title' },
        loadChildren: () => import('./isdn-list/isdn-list.module').then(m => m.IsdnListModule),
      },
    ]),
  ],
})
export class SmppModule { }
