import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
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
  @ViewChild('importModal', { static: true }) importModal: any;

  constructor(protected httpClient: HttpClient, protected esmeAccountService: EsmeAccountService, protected modalService: NgbModal) {}

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

  // + import support
  openImportDialog(): void {
    this.modalService.open(this.importModal, { backdrop: 'static' }).result.then(
      () => this.performImport(),
      () => this.modalService.dismissAll()
    );
  }

  performImport(): void {
    // TODO: Add import process here
    this.modalService.dismissAll();
  }

  uploadFile(event: Event): void {
    const formData = new FormData();
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      formData.append('file', file, file.name);
      this.httpClient.post('api/file-upload', formData, { observe: 'response' }).subscribe();
    }
  }
}
