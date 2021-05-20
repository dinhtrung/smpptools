import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDataFile } from '../data-file.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-data-file-detail',
  templateUrl: './data-file-detail.component.html',
})
export class DataFileDetailComponent implements OnInit {
  dataFile: IDataFile | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dataFile }) => {
      this.dataFile = dataFile;
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
