import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISmscAccount, SmscAccount } from '../smsc-account.model';
import { SmscAccountService } from '../service/smsc-account.service';

@Injectable({ providedIn: 'root' })
export class SmscAccountRoutingResolveService implements Resolve<ISmscAccount> {
  constructor(protected service: SmscAccountService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISmscAccount> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((smscAccount: HttpResponse<SmscAccount>) => {
          if (smscAccount.body) {
            return of(smscAccount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SmscAccount());
  }
}
