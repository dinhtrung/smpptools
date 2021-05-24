import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UploadFileComponent } from '../list/upload-file.component';
import { UploadFileDetailComponent } from '../detail/upload-file-detail.component';
import { UploadFileUpdateComponent } from '../update/upload-file-update.component';
import { UploadFileRoutingResolveService } from './upload-file-routing-resolve.service';

const uploadFileRoute: Routes = [
  {
    path: '',
    component: UploadFileComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UploadFileDetailComponent,
    resolve: {
      uploadFile: UploadFileRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UploadFileUpdateComponent,
    resolve: {
      uploadFile: UploadFileRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UploadFileUpdateComponent,
    resolve: {
      uploadFile: UploadFileRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(uploadFileRoute)],
  exports: [RouterModule],
})
export class UploadFileRoutingModule {}
