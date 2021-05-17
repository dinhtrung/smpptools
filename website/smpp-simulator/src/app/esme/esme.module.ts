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
    ]),
  ],
})
export class EsmeModule { }
