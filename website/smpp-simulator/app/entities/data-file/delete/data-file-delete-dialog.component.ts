import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDataFile } from '../data-file.model';
import { DataFileService } from '../service/data-file.service';

@Component({
  templateUrl: './data-file-delete-dialog.component.html',
})
export class DataFileDeleteDialogComponent {
  dataFile?: IDataFile;

  constructor(protected dataFileService: DataFileService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.dataFileService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
