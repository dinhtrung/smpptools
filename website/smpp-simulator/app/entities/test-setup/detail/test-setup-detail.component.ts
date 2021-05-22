import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestSetup } from '../test-setup.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-test-setup-detail',
  templateUrl: './test-setup-detail.component.html',
})
export class TestSetupDetailComponent implements OnInit {
  testSetup: ITestSetup | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testSetup }) => {
      this.testSetup = testSetup;
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
