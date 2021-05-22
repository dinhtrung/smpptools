import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TestSetupComponent } from './list/test-setup.component';
import { TestSetupDetailComponent } from './detail/test-setup-detail.component';
import { TestSetupUpdateComponent } from './update/test-setup-update.component';
import { TestSetupDeleteDialogComponent } from './delete/test-setup-delete-dialog.component';
import { TestSetupRoutingModule } from './route/test-setup-routing.module';

@NgModule({
  imports: [SharedModule, TestSetupRoutingModule],
  declarations: [TestSetupComponent, TestSetupDetailComponent, TestSetupUpdateComponent, TestSetupDeleteDialogComponent],
  entryComponents: [TestSetupDeleteDialogComponent],
})
export class TestSetupModule {}
