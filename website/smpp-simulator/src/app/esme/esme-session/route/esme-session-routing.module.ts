import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EsmeSessionComponent } from '../list/esme-session.component';
import { EsmeSessionDetailComponent } from '../detail/esme-session-detail.component';
import { EsmeSessionUpdateComponent } from '../update/esme-session-update.component';
import { EsmeSessionRoutingResolveService } from './esme-session-routing-resolve.service';

const esmeAccountRoute: Routes = [
  {
    path: '',
    component: EsmeSessionComponent,

  },
  {
    path: ':id/view',
    component: EsmeSessionDetailComponent,
    resolve: {
      esmeAccount: EsmeSessionRoutingResolveService,
    },

  },
  {
    path: 'new',
    component: EsmeSessionUpdateComponent,
    resolve: {
      esmeAccount: EsmeSessionRoutingResolveService,
    },

  },
  {
    path: ':id/edit',
    component: EsmeSessionUpdateComponent,
    resolve: {
      esmeAccount: EsmeSessionRoutingResolveService,
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(esmeAccountRoute)],
  exports: [RouterModule],
})
export class EsmeSessionRoutingModule {}
