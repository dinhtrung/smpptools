import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestSession } from '../test-session.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-test-session-detail',
  templateUrl: './test-session-detail.component.html',
})
export class TestSessionDetailComponent implements OnInit {
  testSession: ITestSession | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testSession }) => {
      this.testSession = testSession;
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
