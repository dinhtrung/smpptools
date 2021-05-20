import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEsmeSession } from '../esme-session.model';
import { EsmeSessionService } from '../service/esme-session.service';

@Component({
  templateUrl: './esme-session-delete-dialog.component.html',
})
export class EsmeSessionDeleteDialogComponent {
  esmeSession?: IEsmeSession;

  constructor(protected esmeSessionService: EsmeSessionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.esmeSessionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
