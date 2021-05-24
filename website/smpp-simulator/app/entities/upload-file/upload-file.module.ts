import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { UploadFileComponent } from './list/upload-file.component';
import { UploadFileDetailComponent } from './detail/upload-file-detail.component';
import { UploadFileUpdateComponent } from './update/upload-file-update.component';
import { UploadFileDeleteDialogComponent } from './delete/upload-file-delete-dialog.component';
import { UploadFileRoutingModule } from './route/upload-file-routing.module';

@NgModule({
  imports: [SharedModule, UploadFileRoutingModule],
  declarations: [UploadFileComponent, UploadFileDetailComponent, UploadFileUpdateComponent, UploadFileDeleteDialogComponent],
  entryComponents: [UploadFileDeleteDialogComponent],
})
export class UploadFileModule {}
