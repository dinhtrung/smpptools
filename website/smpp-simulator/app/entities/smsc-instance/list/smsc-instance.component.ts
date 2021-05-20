import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISmscInstance } from '../smsc-instance.model';
import { SmscInstanceService } from '../service/smsc-instance.service';
import { SmscInstanceDeleteDialogComponent } from '../delete/smsc-instance-delete-dialog.component';

@Component({
  selector: 'jhi-smsc-instance',
  templateUrl: './smsc-instance.component.html',
})
export class SmscInstanceComponent implements OnInit {
  smscInstances?: ISmscInstance[];
  isLoading = false;

  constructor(protected smscInstanceService: SmscInstanceService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.smscInstanceService.query().subscribe(
      (res: HttpResponse<ISmscInstance[]>) => {
        this.isLoading = false;
        this.smscInstances = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISmscInstance): string {
    return item.id!;
  }

  delete(smscInstance: ISmscInstance): void {
    const modalRef = this.modalService.open(SmscInstanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.smscInstance = smscInstance;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
