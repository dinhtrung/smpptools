import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EsmeSessionComponent } from './list/esme-session.component';
import { EsmeSessionDetailComponent } from './detail/esme-session-detail.component';
import { EsmeSessionUpdateComponent } from './update/esme-session-update.component';
import { EsmeSessionDeleteDialogComponent } from './delete/esme-session-delete-dialog.component';
import { EsmeSessionRoutingModule } from './route/esme-session-routing.module';

@NgModule({
  imports: [SharedModule, EsmeSessionRoutingModule],
  declarations: [EsmeSessionComponent, EsmeSessionDetailComponent, EsmeSessionUpdateComponent, EsmeSessionDeleteDialogComponent],
  entryComponents: [EsmeSessionDeleteDialogComponent],
})
export class EsmeSessionModule {}
