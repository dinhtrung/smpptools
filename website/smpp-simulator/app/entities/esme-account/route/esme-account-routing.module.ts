import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EsmeAccountComponent } from '../list/esme-account.component';
import { EsmeAccountDetailComponent } from '../detail/esme-account-detail.component';
import { EsmeAccountUpdateComponent } from '../update/esme-account-update.component';
import { EsmeAccountRoutingResolveService } from './esme-account-routing-resolve.service';

const esmeAccountRoute: Routes = [
  {
    path: '',
    component: EsmeAccountComponent,
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EsmeAccountDetailComponent,
    resolve: {
      esmeAccount: EsmeAccountRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EsmeAccountUpdateComponent,
    resolve: {
      esmeAccount: EsmeAccountRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EsmeAccountUpdateComponent,
    resolve: {
      esmeAccount: EsmeAccountRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(esmeAccountRoute)],
  exports: [RouterModule],
})
export class EsmeAccountRoutingModule {}
