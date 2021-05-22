import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITestSession } from '../test-session.model';
import { TestSessionService } from '../service/test-session.service';

@Component({
  templateUrl: './test-session-delete-dialog.component.html',
})
export class TestSessionDeleteDialogComponent {
  testSession?: ITestSession;

  constructor(protected testSessionService: TestSessionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.testSessionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
