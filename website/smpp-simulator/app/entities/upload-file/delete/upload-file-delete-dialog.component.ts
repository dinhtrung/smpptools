import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUploadFile } from '../upload-file.model';
import { UploadFileService } from '../service/upload-file.service';

@Component({
  templateUrl: './upload-file-delete-dialog.component.html',
})
export class UploadFileDeleteDialogComponent {
  uploadFile?: IUploadFile;

  constructor(protected uploadFileService: UploadFileService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.uploadFileService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
