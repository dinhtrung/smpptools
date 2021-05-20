import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIsdnList, IsdnList } from '../isdn-list.model';
import { IsdnListService } from '../service/isdn-list.service';

@Injectable({ providedIn: 'root' })
export class IsdnListRoutingResolveService implements Resolve<IIsdnList> {
  constructor(protected service: IsdnListService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIsdnList> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((isdnList: HttpResponse<IsdnList>) => {
          if (isdnList.body) {
            return of(isdnList.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new IsdnList());
  }
}
