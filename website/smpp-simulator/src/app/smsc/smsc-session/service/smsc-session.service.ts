import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISmscSession, getSmscSessionIdentifier } from '../smsc-session.model';

export type EntityResponseType = HttpResponse<ISmscSession>;
export type EntityArrayResponseType = HttpResponse<ISmscSession[]>;

@Injectable({ providedIn: 'root' })
export class SmscSessionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/smsc-sessions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(smscAccount: ISmscSession): Observable<EntityResponseType> {
    return this.http.post<ISmscSession>(this.resourceUrl, smscAccount, { observe: 'response' });
  }

  update(smscAccount: ISmscSession): Observable<EntityResponseType> {
    return this.http.put<ISmscSession>(`${this.resourceUrl}/${getSmscSessionIdentifier(smscAccount) as string}`, smscAccount, {
      observe: 'response',
    });
  }

  partialUpdate(smscAccount: ISmscSession): Observable<EntityResponseType> {
    return this.http.patch<ISmscSession>(`${this.resourceUrl}/${getSmscSessionIdentifier(smscAccount) as string}`, smscAccount, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISmscSession>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISmscSession[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSmscSessionToCollectionIfMissing(
    smscAccountCollection: ISmscSession[],
    ...smscAccountsToCheck: (ISmscSession | null | undefined)[]
  ): ISmscSession[] {
    const smscAccounts: ISmscSession[] = smscAccountsToCheck.filter(isPresent);
    if (smscAccounts.length > 0) {
      const smscAccountCollectionIdentifiers = smscAccountCollection.map(smscAccountItem => getSmscSessionIdentifier(smscAccountItem)!);
      const smscAccountsToAdd = smscAccounts.filter(smscAccountItem => {
        const smscAccountIdentifier = getSmscSessionIdentifier(smscAccountItem);
        if (smscAccountIdentifier == null || smscAccountCollectionIdentifiers.includes(smscAccountIdentifier)) {
          return false;
        }
        smscAccountCollectionIdentifiers.push(smscAccountIdentifier);
        return true;
      });
      return [...smscAccountsToAdd, ...smscAccountCollection];
    }
    return smscAccountCollection;
  }
}
