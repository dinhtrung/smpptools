import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SmscAccountComponent } from '../list/smsc-account.component';
import { SmscAccountDetailComponent } from '../detail/smsc-account-detail.component';
import { SmscAccountUpdateComponent } from '../update/smsc-account-update.component';
import { SmscAccountRoutingResolveService } from './smsc-account-routing-resolve.service';

const smscAccountRoute: Routes = [
  {
    path: '',
    component: SmscAccountComponent,
    
  },
  {
    path: ':id/view',
    component: SmscAccountDetailComponent,
    resolve: {
      smscAccount: SmscAccountRoutingResolveService,
    },
    
  },
  {
    path: 'new',
    component: SmscAccountUpdateComponent,
    resolve: {
      smscAccount: SmscAccountRoutingResolveService,
    },
    
  },
  {
    path: ':id/edit',
    component: SmscAccountUpdateComponent,
    resolve: {
      smscAccount: SmscAccountRoutingResolveService,
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(smscAccountRoute)],
  exports: [RouterModule],
})
export class SmscAccountRoutingModule {}
