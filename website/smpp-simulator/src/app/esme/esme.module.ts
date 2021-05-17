import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
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
    ]),
  ],
})
export class EsmeModule { }
