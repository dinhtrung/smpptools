import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SmscAccountComponent } from './list/smsc-account.component';
import { SmscAccountDetailComponent } from './detail/smsc-account-detail.component';
import { SmscAccountUpdateComponent } from './update/smsc-account-update.component';
import { SmscAccountDeleteDialogComponent } from './delete/smsc-account-delete-dialog.component';
import { SmscAccountRoutingModule } from './route/smsc-account-routing.module';

@NgModule({
  imports: [SharedModule, SmscAccountRoutingModule],
  declarations: [SmscAccountComponent, SmscAccountDetailComponent, SmscAccountUpdateComponent, SmscAccountDeleteDialogComponent],
  entryComponents: [SmscAccountDeleteDialogComponent],
})
export class SmscAccountModule {}
