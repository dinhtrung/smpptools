import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BaseSmComponent } from '../list/base-sm.component';
import { BaseSmDetailComponent } from '../detail/base-sm-detail.component';
import { BaseSmUpdateComponent } from '../update/base-sm-update.component';
import { BaseSmRoutingResolveService } from './base-sm-routing-resolve.service';

const baseSmRoute: Routes = [
  {
    path: '',
    component: BaseSmComponent,
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BaseSmDetailComponent,
    resolve: {
      baseSm: BaseSmRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BaseSmUpdateComponent,
    resolve: {
      baseSm: BaseSmRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BaseSmUpdateComponent,
    resolve: {
      baseSm: BaseSmRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(baseSmRoute)],
  exports: [RouterModule],
})
export class BaseSmRoutingModule {}
