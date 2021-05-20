import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataFileComponent } from '../list/data-file.component';
import { DataFileDetailComponent } from '../detail/data-file-detail.component';
import { DataFileUpdateComponent } from '../update/data-file-update.component';
import { DataFileRoutingResolveService } from './data-file-routing-resolve.service';

const dataFileRoute: Routes = [
  {
    path: '',
    component: DataFileComponent,
  },
  {
    path: ':id/view',
    component: DataFileDetailComponent,
    resolve: {
      dataFile: DataFileRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: DataFileUpdateComponent,
    resolve: {
      dataFile: DataFileRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: DataFileUpdateComponent,
    resolve: {
      dataFile: DataFileRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(dataFileRoute)],
  exports: [RouterModule],
})
export class DataFileRoutingModule {}
