import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDataFile, DataFile } from '../data-file.model';
import { DataFileService } from '../service/data-file.service';

@Injectable({ providedIn: 'root' })
export class DataFileRoutingResolveService implements Resolve<IDataFile> {
  constructor(protected service: DataFileService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDataFile> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dataFile: HttpResponse<DataFile>) => {
          if (dataFile.body) {
            return of(dataFile.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DataFile());
  }
}
