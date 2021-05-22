import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TestSessionComponent } from '../list/test-session.component';
import { TestSessionDetailComponent } from '../detail/test-session-detail.component';
import { TestSessionUpdateComponent } from '../update/test-session-update.component';
import { TestSessionRoutingResolveService } from './test-session-routing-resolve.service';

const testSessionRoute: Routes = [
  {
    path: '',
    component: TestSessionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TestSessionDetailComponent,
    resolve: {
      testSession: TestSessionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TestSessionUpdateComponent,
    resolve: {
      testSession: TestSessionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TestSessionUpdateComponent,
    resolve: {
      testSession: TestSessionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(testSessionRoute)],
  exports: [RouterModule],
})
export class TestSessionRoutingModule {}
