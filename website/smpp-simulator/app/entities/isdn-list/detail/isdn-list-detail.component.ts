import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIsdnList } from '../isdn-list.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-isdn-list-detail',
  templateUrl: './isdn-list-detail.component.html',
})
export class IsdnListDetailComponent implements OnInit {
  isdnList: IIsdnList | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ isdnList }) => {
      this.isdnList = isdnList;
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
