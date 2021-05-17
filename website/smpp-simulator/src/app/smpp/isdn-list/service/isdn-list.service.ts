import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIsdnList, getIsdnListIdentifier } from '../isdn-list.model';

export type EntityResponseType = HttpResponse<IIsdnList>;
export type EntityArrayResponseType = HttpResponse<IIsdnList[]>;

@Injectable({ providedIn: 'root' })
export class IsdnListService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/isdn-lists');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(isdnList: IIsdnList): Observable<EntityResponseType> {
    return this.http.post<IIsdnList>(this.resourceUrl, isdnList, { observe: 'response' });
  }

  update(isdnList: IIsdnList): Observable<EntityResponseType> {
    return this.http.put<IIsdnList>(`${this.resourceUrl}/${getIsdnListIdentifier(isdnList) as string}`, isdnList, { observe: 'response' });
  }

  partialUpdate(isdnList: IIsdnList): Observable<EntityResponseType> {
    return this.http.patch<IIsdnList>(`${this.resourceUrl}/${getIsdnListIdentifier(isdnList) as string}`, isdnList, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IIsdnList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIsdnList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addIsdnListToCollectionIfMissing(isdnListCollection: IIsdnList[], ...isdnListsToCheck: (IIsdnList | null | undefined)[]): IIsdnList[] {
    const isdnLists: IIsdnList[] = isdnListsToCheck.filter(isPresent);
    if (isdnLists.length > 0) {
      const isdnListCollectionIdentifiers = isdnListCollection.map(isdnListItem => getIsdnListIdentifier(isdnListItem)!);
      const isdnListsToAdd = isdnLists.filter(isdnListItem => {
        const isdnListIdentifier = getIsdnListIdentifier(isdnListItem);
        if (isdnListIdentifier == null || isdnListCollectionIdentifiers.includes(isdnListIdentifier)) {
          return false;
        }
        isdnListCollectionIdentifiers.push(isdnListIdentifier);
        return true;
      });
      return [...isdnListsToAdd, ...isdnListCollection];
    }
    return isdnListCollection;
  }
}
