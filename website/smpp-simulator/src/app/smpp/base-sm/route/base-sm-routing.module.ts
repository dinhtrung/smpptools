import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BaseSmComponent } from '../list/base-sm.component';
import { BaseSmDetailComponent } from '../detail/base-sm-detail.component';
import { BaseSmUpdateComponent } from '../update/base-sm-update.component';
import { BaseSmRoutingResolveService } from './base-sm-routing-resolve.service';

const baseSmRoute: Routes = [
  {
    path: '',
    component: BaseSmComponent,
    
  },
  {
    path: ':id/view',
    component: BaseSmDetailComponent,
    resolve: {
      baseSm: BaseSmRoutingResolveService,
    },
    
  },
  {
    path: 'new',
    component: BaseSmUpdateComponent,
    resolve: {
      baseSm: BaseSmRoutingResolveService,
    },
    
  },
  {
    path: ':id/edit',
    component: BaseSmUpdateComponent,
    resolve: {
      baseSm: BaseSmRoutingResolveService,
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(baseSmRoute)],
  exports: [RouterModule],
})
export class BaseSmRoutingModule {}
