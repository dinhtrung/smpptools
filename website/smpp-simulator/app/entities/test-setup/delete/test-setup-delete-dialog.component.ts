import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITestSetup } from '../test-setup.model';
import { TestSetupService } from '../service/test-setup.service';

@Component({
  templateUrl: './test-setup-delete-dialog.component.html',
})
export class TestSetupDeleteDialogComponent {
  testSetup?: ITestSetup;

  constructor(protected testSetupService: TestSetupService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.testSetupService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
