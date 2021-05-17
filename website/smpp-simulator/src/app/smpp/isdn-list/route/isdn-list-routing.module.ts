import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { IsdnListComponent } from '../list/isdn-list.component';
import { IsdnListDetailComponent } from '../detail/isdn-list-detail.component';
import { IsdnListUpdateComponent } from '../update/isdn-list-update.component';
import { IsdnListRoutingResolveService } from './isdn-list-routing-resolve.service';

const isdnListRoute: Routes = [
  {
    path: '',
    component: IsdnListComponent,
    
  },
  {
    path: ':id/view',
    component: IsdnListDetailComponent,
    resolve: {
      isdnList: IsdnListRoutingResolveService,
    },
    
  },
  {
    path: 'new',
    component: IsdnListUpdateComponent,
    resolve: {
      isdnList: IsdnListRoutingResolveService,
    },
    
  },
  {
    path: ':id/edit',
    component: IsdnListUpdateComponent,
    resolve: {
      isdnList: IsdnListRoutingResolveService,
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(isdnListRoute)],
  exports: [RouterModule],
})
export class IsdnListRoutingModule {}
