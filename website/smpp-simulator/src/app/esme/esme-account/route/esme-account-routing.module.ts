import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EsmeAccountComponent } from '../list/esme-account.component';
import { EsmeAccountDetailComponent } from '../detail/esme-account-detail.component';
import { EsmeAccountUpdateComponent } from '../update/esme-account-update.component';
import { EsmeAccountRoutingResolveService } from './esme-account-routing-resolve.service';

const esmeAccountRoute: Routes = [
  {
    path: '',
    component: EsmeAccountComponent,

  },
  {
    path: ':id/view',
    component: EsmeAccountDetailComponent,
    resolve: {
      esmeAccount: EsmeAccountRoutingResolveService,
    },

  },
  {
    path: 'new',
    component: EsmeAccountUpdateComponent,
    resolve: {
      esmeAccount: EsmeAccountRoutingResolveService,
    },

  },
  {
    path: ':id/edit',
    component: EsmeAccountUpdateComponent,
    resolve: {
      esmeAccount: EsmeAccountRoutingResolveService,
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(esmeAccountRoute)],
  exports: [RouterModule],
})
export class EsmeAccountRoutingModule {}
