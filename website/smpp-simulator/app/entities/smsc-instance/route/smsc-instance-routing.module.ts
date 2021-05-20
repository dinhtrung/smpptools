import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SmscInstanceComponent } from '../list/smsc-instance.component';
import { SmscInstanceDetailComponent } from '../detail/smsc-instance-detail.component';
import { SmscInstanceUpdateComponent } from '../update/smsc-instance-update.component';
import { SmscInstanceRoutingResolveService } from './smsc-instance-routing-resolve.service';

const smscInstanceRoute: Routes = [
  {
    path: '',
    component: SmscInstanceComponent,
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SmscInstanceDetailComponent,
    resolve: {
      smscInstance: SmscInstanceRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SmscInstanceUpdateComponent,
    resolve: {
      smscInstance: SmscInstanceRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SmscInstanceUpdateComponent,
    resolve: {
      smscInstance: SmscInstanceRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(smscInstanceRoute)],
  exports: [RouterModule],
})
export class SmscInstanceRoutingModule {}
