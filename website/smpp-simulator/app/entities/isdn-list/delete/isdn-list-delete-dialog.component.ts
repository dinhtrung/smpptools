import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IIsdnList } from '../isdn-list.model';
import { IsdnListService } from '../service/isdn-list.service';

@Component({
  templateUrl: './isdn-list-delete-dialog.component.html',
})
export class IsdnListDeleteDialogComponent {
  isdnList?: IIsdnList;

  constructor(protected isdnListService: IsdnListService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.isdnListService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
