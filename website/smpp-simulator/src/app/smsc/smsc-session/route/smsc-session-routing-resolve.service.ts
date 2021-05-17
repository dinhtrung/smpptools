import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISmscSession, SmscSession } from '../smsc-session.model';
import { SmscSessionService } from '../service/smsc-session.service';

@Injectable({ providedIn: 'root' })
export class SmscSessionRoutingResolveService implements Resolve<ISmscSession> {
  constructor(protected service: SmscSessionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISmscSession> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((smscSession: HttpResponse<SmscSession>) => {
          if (smscSession.body) {
            return of(smscSession.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SmscSession());
  }
}
