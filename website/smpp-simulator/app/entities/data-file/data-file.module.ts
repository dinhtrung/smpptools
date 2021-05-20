import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DataFileComponent } from './list/data-file.component';
import { DataFileDetailComponent } from './detail/data-file-detail.component';
import { DataFileUpdateComponent } from './update/data-file-update.component';
import { DataFileDeleteDialogComponent } from './delete/data-file-delete-dialog.component';
import { DataFileRoutingModule } from './route/data-file-routing.module';

@NgModule({
  imports: [SharedModule, DataFileRoutingModule],
  declarations: [DataFileComponent, DataFileDetailComponent, DataFileUpdateComponent, DataFileDeleteDialogComponent],
  entryComponents: [DataFileDeleteDialogComponent],
})
export class DataFileModule {}
