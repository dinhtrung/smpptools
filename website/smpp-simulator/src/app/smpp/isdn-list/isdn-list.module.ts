import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { IsdnListComponent } from './list/isdn-list.component';
import { IsdnListDetailComponent } from './detail/isdn-list-detail.component';
import { IsdnListUpdateComponent } from './update/isdn-list-update.component';
import { IsdnListDeleteDialogComponent } from './delete/isdn-list-delete-dialog.component';
import { IsdnListRoutingModule } from './route/isdn-list-routing.module';

@NgModule({
  imports: [SharedModule, IsdnListRoutingModule],
  declarations: [IsdnListComponent, IsdnListDetailComponent, IsdnListUpdateComponent, IsdnListDeleteDialogComponent],
  entryComponents: [IsdnListDeleteDialogComponent],
})
export class IsdnListModule {}
