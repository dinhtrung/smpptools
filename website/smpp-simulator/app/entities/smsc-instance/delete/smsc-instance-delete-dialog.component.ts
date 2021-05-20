import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISmscInstance } from '../smsc-instance.model';
import { SmscInstanceService } from '../service/smsc-instance.service';

@Component({
  templateUrl: './smsc-instance-delete-dialog.component.html',
})
export class SmscInstanceDeleteDialogComponent {
  smscInstance?: ISmscInstance;

  constructor(protected smscInstanceService: SmscInstanceService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.smscInstanceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
