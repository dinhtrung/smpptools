import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISmscSession } from '../smsc-session.model';
import { SmscSessionService } from '../service/smsc-session.service';

@Component({
  templateUrl: './smsc-session-delete-dialog.component.html',
})
export class SmscSessionDeleteDialogComponent {
  smscAccount?: ISmscSession;

  constructor(protected smscAccountService: SmscSessionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.smscAccountService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
