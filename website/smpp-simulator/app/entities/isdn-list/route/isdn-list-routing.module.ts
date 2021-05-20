import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { IsdnListComponent } from '../list/isdn-list.component';
import { IsdnListDetailComponent } from '../detail/isdn-list-detail.component';
import { IsdnListUpdateComponent } from '../update/isdn-list-update.component';
import { IsdnListRoutingResolveService } from './isdn-list-routing-resolve.service';

const isdnListRoute: Routes = [
  {
    path: '',
    component: IsdnListComponent,
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IsdnListDetailComponent,
    resolve: {
      isdnList: IsdnListRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IsdnListUpdateComponent,
    resolve: {
      isdnList: IsdnListRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IsdnListUpdateComponent,
    resolve: {
      isdnList: IsdnListRoutingResolveService,
    },
    // canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(isdnListRoute)],
  exports: [RouterModule],
})
export class IsdnListRoutingModule {}
