import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EsmeSessionComponent } from '../list/esme-session.component';
import { EsmeSessionDetailComponent } from '../detail/esme-session-detail.component';
import { EsmeSessionUpdateComponent } from '../update/esme-session-update.component';
import { EsmeSessionRoutingResolveService } from './esme-session-routing-resolve.service';

const esmeSessionRoute: Routes = [
  {
    path: '',
    component: EsmeSessionComponent,
  },
  {
    path: ':id/view',
    component: EsmeSessionDetailComponent,
    resolve: {
      esmeSession: EsmeSessionRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: EsmeSessionUpdateComponent,
    resolve: {
      esmeSession: EsmeSessionRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: EsmeSessionUpdateComponent,
    resolve: {
      esmeSession: EsmeSessionRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(esmeSessionRoute)],
  exports: [RouterModule],
})
export class EsmeSessionRoutingModule {}
