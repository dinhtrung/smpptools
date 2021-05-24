import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TestCaseComponent } from '../list/test-case.component';
import { TestCaseDetailComponent } from '../detail/test-case-detail.component';
import { TestCaseRoutingResolveService } from './test-case-routing-resolve.service';

const testCaseRoute: Routes = [
  {
    path: '',
    component: TestCaseComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TestCaseDetailComponent,
    resolve: {
      testCase: TestCaseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(testCaseRoute)],
  exports: [RouterModule],
})
export class TestCaseRoutingModule {}
