import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SmscSessionComponent } from '../list/smsc-session.component';
import { SmscSessionDetailComponent } from '../detail/smsc-session-detail.component';
import { SmscSessionUpdateComponent } from '../update/smsc-session-update.component';
import { SmscSessionRoutingResolveService } from './smsc-session-routing-resolve.service';

const smscAccountRoute: Routes = [
  {
    path: '',
    component: SmscSessionComponent,

  },
  {
    path: ':id/view',
    component: SmscSessionDetailComponent,
    resolve: {
      smscAccount: SmscSessionRoutingResolveService,
    },

  },
  {
    path: 'new',
    component: SmscSessionUpdateComponent,
    resolve: {
      smscAccount: SmscSessionRoutingResolveService,
    },

  },
  {
    path: ':id/edit',
    component: SmscSessionUpdateComponent,
    resolve: {
      smscAccount: SmscSessionRoutingResolveService,
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(smscAccountRoute)],
  exports: [RouterModule],
})
export class SmscSessionRoutingModule {}
