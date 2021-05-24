import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUploadFile } from '../upload-file.model';
import { UploadFileService } from '../service/upload-file.service';
import { UploadFileDeleteDialogComponent } from '../delete/upload-file-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent implements OnInit {
  uploadFiles?: IUploadFile[];
  isLoading = false;

  constructor(protected uploadFileService: UploadFileService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.uploadFileService.query().subscribe(
      (res: HttpResponse<IUploadFile[]>) => {
        this.isLoading = false;
        this.uploadFiles = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IUploadFile): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(uploadFile: IUploadFile): void {
    const modalRef = this.modalService.open(UploadFileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.uploadFile = uploadFile;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
