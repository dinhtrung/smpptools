import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBaseSm, getBaseSmIdentifier } from '../base-sm.model';

export type EntityResponseType = HttpResponse<IBaseSm>;
export type EntityArrayResponseType = HttpResponse<IBaseSm[]>;

@Injectable({ providedIn: 'root' })
export class BaseSmService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/base-sms');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(baseSm: IBaseSm): Observable<EntityResponseType> {
    return this.http.post<IBaseSm>(this.resourceUrl, baseSm, { observe: 'response' });
  }

  update(baseSm: IBaseSm): Observable<EntityResponseType> {
    return this.http.put<IBaseSm>(`${this.resourceUrl}/${getBaseSmIdentifier(baseSm) as string}`, baseSm, { observe: 'response' });
  }

  partialUpdate(baseSm: IBaseSm): Observable<EntityResponseType> {
    return this.http.patch<IBaseSm>(`${this.resourceUrl}/${getBaseSmIdentifier(baseSm) as string}`, baseSm, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IBaseSm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBaseSm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addBaseSmToCollectionIfMissing(baseSmCollection: IBaseSm[], ...baseSmsToCheck: (IBaseSm | null | undefined)[]): IBaseSm[] {
    const baseSms: IBaseSm[] = baseSmsToCheck.filter(isPresent);
    if (baseSms.length > 0) {
      const baseSmCollectionIdentifiers = baseSmCollection.map(baseSmItem => getBaseSmIdentifier(baseSmItem)!);
      const baseSmsToAdd = baseSms.filter(baseSmItem => {
        const baseSmIdentifier = getBaseSmIdentifier(baseSmItem);
        if (baseSmIdentifier == null || baseSmCollectionIdentifiers.includes(baseSmIdentifier)) {
          return false;
        }
        baseSmCollectionIdentifiers.push(baseSmIdentifier);
        return true;
      });
      return [...baseSmsToAdd, ...baseSmCollection];
    }
    return baseSmCollection;
  }
}
