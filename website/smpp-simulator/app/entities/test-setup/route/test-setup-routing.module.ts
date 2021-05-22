import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TestSetupComponent } from '../list/test-setup.component';
import { TestSetupDetailComponent } from '../detail/test-setup-detail.component';
import { TestSetupUpdateComponent } from '../update/test-setup-update.component';
import { TestSetupRoutingResolveService } from './test-setup-routing-resolve.service';

const testSetupRoute: Routes = [
  {
    path: '',
    component: TestSetupComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TestSetupDetailComponent,
    resolve: {
      testSetup: TestSetupRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TestSetupUpdateComponent,
    resolve: {
      testSetup: TestSetupRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TestSetupUpdateComponent,
    resolve: {
      testSetup: TestSetupRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(testSetupRoute)],
  exports: [RouterModule],
})
export class TestSetupRoutingModule {}
