import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEsmeAccount, EsmeAccount } from '../esme-account.model';
import { EsmeAccountService } from '../service/esme-account.service';

@Injectable({ providedIn: 'root' })
export class EsmeAccountRoutingResolveService implements Resolve<IEsmeAccount> {
  constructor(protected service: EsmeAccountService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEsmeAccount> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((esmeAccount: HttpResponse<EsmeAccount>) => {
          if (esmeAccount.body) {
            return of(esmeAccount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EsmeAccount());
  }
}
