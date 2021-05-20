import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEsmeSession, EsmeSession } from '../esme-session.model';
import { EsmeSessionService } from '../service/esme-session.service';

@Injectable({ providedIn: 'root' })
export class EsmeSessionRoutingResolveService implements Resolve<IEsmeSession> {
  constructor(protected service: EsmeSessionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEsmeSession> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((esmeSession: HttpResponse<EsmeSession>) => {
          if (esmeSession.body) {
            return of(esmeSession.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EsmeSession());
  }
}
