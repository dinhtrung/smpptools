import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISmscSession } from '../smsc-session.model';
import { SmscSessionService } from '../service/smsc-session.service';
import { SmscSessionDeleteDialogComponent } from '../delete/smsc-session-delete-dialog.component';

@Component({
  selector: 'jhi-smsc-session',
  templateUrl: './smsc-session.component.html',
})
export class SmscSessionComponent implements OnInit {
  smscAccounts?: ISmscSession[];
  isLoading = false;

  constructor(protected smscAccountService: SmscSessionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.smscAccountService.query().subscribe(
      (res: HttpResponse<ISmscSession[]>) => {
        this.isLoading = false;
        this.smscAccounts = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISmscSession): string {
    return item.id!;
  }

  delete(smscAccount: ISmscSession): void {
    const modalRef = this.modalService.open(SmscSessionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.smscAccount = smscAccount;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
