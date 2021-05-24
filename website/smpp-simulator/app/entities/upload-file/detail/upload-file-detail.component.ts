import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUploadFile } from '../upload-file.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-upload-file-detail',
  templateUrl: './upload-file-detail.component.html',
})
export class UploadFileDetailComponent implements OnInit {
  uploadFile: IUploadFile | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uploadFile }) => {
      this.uploadFile = uploadFile;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
