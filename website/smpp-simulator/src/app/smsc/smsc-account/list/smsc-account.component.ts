import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISmscAccount } from '../smsc-account.model';
import { SmscAccountService } from '../service/smsc-account.service';
import { SmscAccountDeleteDialogComponent } from '../delete/smsc-account-delete-dialog.component';

@Component({
  selector: 'jhi-smsc-account',
  templateUrl: './smsc-account.component.html',
})
export class SmscAccountComponent implements OnInit {
  smscAccounts?: ISmscAccount[];
  isLoading = false;

  constructor(protected smscAccountService: SmscAccountService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.smscAccountService.query().subscribe(
      (res: HttpResponse<ISmscAccount[]>) => {
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

  trackId(index: number, item: ISmscAccount): string {
    return item.id!;
  }

  delete(smscAccount: ISmscAccount): void {
    const modalRef = this.modalService.open(SmscAccountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.smscAccount = smscAccount;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
