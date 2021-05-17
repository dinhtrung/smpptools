import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EsmeAccountComponent } from './list/esme-account.component';
import { EsmeAccountDetailComponent } from './detail/esme-account-detail.component';
import { EsmeAccountUpdateComponent } from './update/esme-account-update.component';
import { EsmeAccountDeleteDialogComponent } from './delete/esme-account-delete-dialog.component';
import { EsmeAccountRoutingModule } from './route/esme-account-routing.module';

@NgModule({
  imports: [SharedModule, EsmeAccountRoutingModule],
  declarations: [EsmeAccountComponent, EsmeAccountDetailComponent, EsmeAccountUpdateComponent, EsmeAccountDeleteDialogComponent],
  entryComponents: [EsmeAccountDeleteDialogComponent],
})
export class EsmeAccountModule {}
