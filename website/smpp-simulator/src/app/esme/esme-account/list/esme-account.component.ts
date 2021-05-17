import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEsmeAccount } from '../esme-account.model';
import { EsmeAccountService } from '../service/esme-account.service';
import { EsmeAccountDeleteDialogComponent } from '../delete/esme-account-delete-dialog.component';

@Component({
  selector: 'jhi-esme-account',
  templateUrl: './esme-account.component.html',
})
export class EsmeAccountComponent implements OnInit {
  esmeAccounts?: IEsmeAccount[];
  isLoading = false;

  constructor(protected esmeAccountService: EsmeAccountService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.esmeAccountService.query().subscribe(
      (res: HttpResponse<IEsmeAccount[]>) => {
        this.isLoading = false;
        this.esmeAccounts = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEsmeAccount): string {
    return item.id!;
  }

  delete(esmeAccount: IEsmeAccount): void {
    const modalRef = this.modalService.open(EsmeAccountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.esmeAccount = esmeAccount;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
