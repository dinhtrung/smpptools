import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDataFile } from '../data-file.model';
import { DataFileService } from '../service/data-file.service';
import { DataFileDeleteDialogComponent } from '../delete/data-file-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-data-file',
  templateUrl: './data-file.component.html',
})
export class DataFileComponent implements OnInit {
  dataFiles?: IDataFile[];
  isLoading = false;

  constructor(protected dataFileService: DataFileService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.dataFileService.query().subscribe(
      (res: HttpResponse<IDataFile[]>) => {
        this.isLoading = false;
        this.dataFiles = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDataFile): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(dataFile: IDataFile): void {
    const modalRef = this.modalService.open(DataFileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dataFile = dataFile;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
