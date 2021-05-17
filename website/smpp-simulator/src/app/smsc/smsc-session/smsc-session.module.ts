import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SmscSessionComponent } from './list/smsc-session.component';
import { SmscSessionDetailComponent } from './detail/smsc-session-detail.component';
import { SmscSessionUpdateComponent } from './update/smsc-session-update.component';
import { SmscSessionDeleteDialogComponent } from './delete/smsc-session-delete-dialog.component';
import { SmscSessionRoutingModule } from './route/smsc-session-routing.module';

@NgModule({
  imports: [SharedModule, SmscSessionRoutingModule],
  declarations: [SmscSessionComponent, SmscSessionDetailComponent, SmscSessionUpdateComponent, SmscSessionDeleteDialogComponent],
  entryComponents: [SmscSessionDeleteDialogComponent],
})
export class SmscSessionModule {}
