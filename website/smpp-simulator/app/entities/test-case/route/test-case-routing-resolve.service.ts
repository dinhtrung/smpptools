import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITestCase, TestCase } from '../test-case.model';
import { TestCaseService } from '../service/test-case.service';

@Injectable({ providedIn: 'root' })
export class TestCaseRoutingResolveService implements Resolve<ITestCase> {
  constructor(protected service: TestCaseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITestCase> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((testCase: HttpResponse<TestCase>) => {
          if (testCase.body) {
            return of(testCase.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TestCase());
  }
}
