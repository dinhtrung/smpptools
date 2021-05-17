import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEsmeAccount } from '../esme-account.model';
import { EsmeAccountService } from '../service/esme-account.service';

@Component({
  templateUrl: './esme-account-delete-dialog.component.html',
})
export class EsmeAccountDeleteDialogComponent {
  esmeAccount?: IEsmeAccount;

  constructor(protected esmeAccountService: EsmeAccountService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.esmeAccountService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
