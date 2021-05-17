import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEsmeSession } from '../esme-session.model';
import { EsmeSessionService } from '../service/esme-session.service';
import { EsmeSessionDeleteDialogComponent } from '../delete/esme-session-delete-dialog.component';

@Component({
  selector: 'jhi-esme-session',
  templateUrl: './esme-session.component.html',
})
export class EsmeSessionComponent implements OnInit {
  esmeAccounts?: IEsmeSession[];
  isLoading = false;

  constructor(protected esmeAccountService: EsmeSessionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.esmeAccountService.query().subscribe(
      (res: HttpResponse<IEsmeSession[]>) => {
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

  trackId(index: number, item: IEsmeSession): string {
    return item.id!;
  }

  delete(esmeAccount: IEsmeSession): void {
    const modalRef = this.modalService.open(EsmeSessionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.esmeAccount = esmeAccount;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
