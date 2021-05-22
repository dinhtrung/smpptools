import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITestSession } from '../test-session.model';
import { TestSessionService } from '../service/test-session.service';
import { TestSessionDeleteDialogComponent } from '../delete/test-session-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-test-session',
  templateUrl: './test-session.component.html',
})
export class TestSessionComponent implements OnInit {
  testSessions?: ITestSession[];
  isLoading = false;

  constructor(protected testSessionService: TestSessionService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.testSessionService.query().subscribe(
      (res: HttpResponse<ITestSession[]>) => {
        this.isLoading = false;
        this.testSessions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITestSession): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(testSession: ITestSession): void {
    const modalRef = this.modalService.open(TestSessionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.testSession = testSession;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
