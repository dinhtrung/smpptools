import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISmscAccount } from '../smsc-account.model';
import { SmscAccountService } from '../service/smsc-account.service';

@Component({
  templateUrl: './smsc-account-delete-dialog.component.html',
})
export class SmscAccountDeleteDialogComponent {
  smscAccount?: ISmscAccount;

  constructor(protected smscAccountService: SmscAccountService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.smscAccountService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
