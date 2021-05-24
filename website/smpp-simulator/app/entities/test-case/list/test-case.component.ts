import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ITestCase } from '../test-case.model';
import { TestCaseService } from '../service/test-case.service';

@Component({
  selector: 'jhi-test-case',
  templateUrl: './test-case.component.html',
})
export class TestCaseComponent implements OnInit {
  testCases?: ITestCase[];
  isLoading = false;

  constructor(protected testCaseService: TestCaseService) {}

  loadAll(): void {
    this.isLoading = true;

    this.testCaseService.query().subscribe(
      (res: HttpResponse<ITestCase[]>) => {
        this.isLoading = false;
        this.testCases = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITestCase): string {
    return item.id!;
  }
}
