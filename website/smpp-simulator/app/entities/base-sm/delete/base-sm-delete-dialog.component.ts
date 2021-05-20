import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBaseSm } from '../base-sm.model';
import { BaseSmService } from '../service/base-sm.service';

@Component({
  templateUrl: './base-sm-delete-dialog.component.html',
})
export class BaseSmDeleteDialogComponent {
  baseSm?: IBaseSm;

  constructor(protected baseSmService: BaseSmService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.baseSmService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
