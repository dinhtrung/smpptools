import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIsdnList } from '../isdn-list.model';
import { IsdnListService } from '../service/isdn-list.service';
import { IsdnListDeleteDialogComponent } from '../delete/isdn-list-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-isdn-list',
  templateUrl: './isdn-list.component.html',
})
export class IsdnListComponent implements OnInit {
  isdnLists?: IIsdnList[];
  isLoading = false;

  constructor(protected isdnListService: IsdnListService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.isdnListService.query().subscribe(
      (res: HttpResponse<IIsdnList[]>) => {
        this.isLoading = false;
        this.isdnLists = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IIsdnList): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(isdnList: IIsdnList): void {
    const modalRef = this.modalService.open(IsdnListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.isdnList = isdnList;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
