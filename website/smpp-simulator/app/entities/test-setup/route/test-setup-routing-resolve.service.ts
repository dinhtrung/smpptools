import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITestSetup, TestSetup } from '../test-setup.model';
import { TestSetupService } from '../service/test-setup.service';

@Injectable({ providedIn: 'root' })
export class TestSetupRoutingResolveService implements Resolve<ITestSetup> {
  constructor(protected service: TestSetupService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITestSetup> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((testSetup: HttpResponse<TestSetup>) => {
          if (testSetup.body) {
            return of(testSetup.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TestSetup());
  }
}
