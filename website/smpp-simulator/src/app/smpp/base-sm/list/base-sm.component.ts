import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBaseSm } from '../base-sm.model';
import { BaseSmService } from '../service/base-sm.service';
import { BaseSmDeleteDialogComponent } from '../delete/base-sm-delete-dialog.component';
import { SMPP_TON, SMPP_NPI } from 'app/config/smpp-error-codes.constants';
import * as _ from 'lodash';

@Component({
  selector: 'jhi-base-sm',
  templateUrl: './base-sm.component.html',
})
export class BaseSmComponent implements OnInit {
  baseSms?: IBaseSm[];
  isLoading = false;
  smppTON = _.keyBy(SMPP_TON, 'value');
  smppNPI = _.keyBy(SMPP_NPI, 'value');

  constructor(protected baseSmService: BaseSmService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.baseSmService.query().subscribe(
      (res: HttpResponse<IBaseSm[]>) => {
        this.isLoading = false;
        this.baseSms = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IBaseSm): string {
    return item.id!;
  }

  delete(baseSm: IBaseSm): void {
    const modalRef = this.modalService.open(BaseSmDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.baseSm = baseSm;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
