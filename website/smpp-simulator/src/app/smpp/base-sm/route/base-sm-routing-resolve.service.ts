import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBaseSm, BaseSm } from '../base-sm.model';
import { BaseSmService } from '../service/base-sm.service';

@Injectable({ providedIn: 'root' })
export class BaseSmRoutingResolveService implements Resolve<IBaseSm> {
  constructor(protected service: BaseSmService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBaseSm> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((baseSm: HttpResponse<BaseSm>) => {
          if (baseSm.body) {
            return of(baseSm.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BaseSm());
  }
}
