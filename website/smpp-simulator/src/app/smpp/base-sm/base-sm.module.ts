import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { BaseSmComponent } from './list/base-sm.component';
import { BaseSmDetailComponent } from './detail/base-sm-detail.component';
import { BaseSmUpdateComponent } from './update/base-sm-update.component';
import { BaseSmDeleteDialogComponent } from './delete/base-sm-delete-dialog.component';
import { BaseSmRoutingModule } from './route/base-sm-routing.module';

@NgModule({
  imports: [SharedModule, BaseSmRoutingModule],
  declarations: [BaseSmComponent, BaseSmDetailComponent, BaseSmUpdateComponent, BaseSmDeleteDialogComponent],
  entryComponents: [BaseSmDeleteDialogComponent],
})
export class BaseSmModule {}
