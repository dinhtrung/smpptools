import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SmscInstanceComponent } from '../list/smsc-instance.component';
import { SmscInstanceDetailComponent } from '../detail/smsc-instance-detail.component';
import { SmscInstanceUpdateComponent } from '../update/smsc-instance-update.component';
import { SmscInstanceRoutingResolveService } from './smsc-instance-routing-resolve.service';

const smscInstanceRoute: Routes = [
  {
    path: '',
    component: SmscInstanceComponent,
    
  },
  {
    path: ':id/view',
    component: SmscInstanceDetailComponent,
    resolve: {
      smscInstance: SmscInstanceRoutingResolveService,
    },
    
  },
  {
    path: 'new',
    component: SmscInstanceUpdateComponent,
    resolve: {
      smscInstance: SmscInstanceRoutingResolveService,
    },
    
  },
  {
    path: ':id/edit',
    component: SmscInstanceUpdateComponent,
    resolve: {
      smscInstance: SmscInstanceRoutingResolveService,
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(smscInstanceRoute)],
  exports: [RouterModule],
})
export class SmscInstanceRoutingModule {}
