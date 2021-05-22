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
        path: 'esme-account',
        data: { pageTitle: 'smpptoolsApp.esmeAccount.home.title' },
        loadChildren: () => import('./esme-account/esme-account.module').then(m => m.EsmeAccountModule),
      },
      {
        path: 'esme-session',
        data: { pageTitle: 'smpptoolsApp.esmeSession.home.title' },
        loadChildren: () => import('./esme-session/esme-session.module').then(m => m.EsmeSessionModule),
      },
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
      },
      {
        path: 'isdn-list',
        data: { pageTitle: 'smpptoolsApp.isdnList.home.title' },
        loadChildren: () => import('./isdn-list/isdn-list.module').then(m => m.IsdnListModule),
      },
      {
        path: 'test-setup',
        data: { pageTitle: 'smpptoolsApp.smscSession.home.title' },
        loadChildren: () => import('./test-setup/test-setup.module').then(m => m.TestSetupModule),
      },
      {
        path: 'test-session',
        data: { pageTitle: 'smpptoolsApp.smscSession.home.title' },
        loadChildren: () => import('./test-session/test-session.module').then(m => m.TestSessionModule),
      },
      {
        path: 'data-file',
        data: { pageTitle: 'smpptoolsApp.dataFile.home.title' },
        loadChildren: () => import('./data-file/data-file.module').then(m => m.DataFileModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
