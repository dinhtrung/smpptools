import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TestSessionComponent } from './list/test-session.component';
import { TestSessionDetailComponent } from './detail/test-session-detail.component';
import { TestSessionUpdateComponent } from './update/test-session-update.component';
import { TestSessionDeleteDialogComponent } from './delete/test-session-delete-dialog.component';
import { TestSessionRoutingModule } from './route/test-session-routing.module';

@NgModule({
  imports: [SharedModule, TestSessionRoutingModule],
  declarations: [TestSessionComponent, TestSessionDetailComponent, TestSessionUpdateComponent, TestSessionDeleteDialogComponent],
  entryComponents: [TestSessionDeleteDialogComponent],
})
export class TestSessionModule {}
