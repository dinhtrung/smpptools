import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SmscInstanceComponent } from './list/smsc-instance.component';
import { SmscInstanceDetailComponent } from './detail/smsc-instance-detail.component';
import { SmscInstanceUpdateComponent } from './update/smsc-instance-update.component';
import { SmscInstanceDeleteDialogComponent } from './delete/smsc-instance-delete-dialog.component';
import { SmscInstanceRoutingModule } from './route/smsc-instance-routing.module';

@NgModule({
  imports: [SharedModule, SmscInstanceRoutingModule],
  declarations: [SmscInstanceComponent, SmscInstanceDetailComponent, SmscInstanceUpdateComponent, SmscInstanceDeleteDialogComponent],
  entryComponents: [SmscInstanceDeleteDialogComponent],
})
export class SmscInstanceModule {}
