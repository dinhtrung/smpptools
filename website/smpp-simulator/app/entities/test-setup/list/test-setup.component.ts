import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITestSetup } from '../test-setup.model';
import { TestSetupService } from '../service/test-setup.service';
import { TestSetupDeleteDialogComponent } from '../delete/test-setup-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-test-setup',
  templateUrl: './test-setup.component.html',
})
export class TestSetupComponent implements OnInit {
  testSetups?: ITestSetup[];
  isLoading = false;

  constructor(protected testSetupService: TestSetupService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.testSetupService.query().subscribe(
      (res: HttpResponse<ITestSetup[]>) => {
        this.isLoading = false;
        this.testSetups = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITestSetup): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(testSetup: ITestSetup): void {
    const modalRef = this.modalService.open(TestSetupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.testSetup = testSetup;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
