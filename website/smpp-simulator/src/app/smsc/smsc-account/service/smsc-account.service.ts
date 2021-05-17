import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISmscAccount, getSmscAccountIdentifier } from '../smsc-account.model';

export type EntityResponseType = HttpResponse<ISmscAccount>;
export type EntityArrayResponseType = HttpResponse<ISmscAccount[]>;

@Injectable({ providedIn: 'root' })
export class SmscAccountService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/smsc-accounts');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(smscAccount: ISmscAccount): Observable<EntityResponseType> {
    return this.http.post<ISmscAccount>(this.resourceUrl, smscAccount, { observe: 'response' });
  }

  update(smscAccount: ISmscAccount): Observable<EntityResponseType> {
    return this.http.put<ISmscAccount>(`${this.resourceUrl}/${getSmscAccountIdentifier(smscAccount) as string}`, smscAccount, {
      observe: 'response',
    });
  }

  partialUpdate(smscAccount: ISmscAccount): Observable<EntityResponseType> {
    return this.http.patch<ISmscAccount>(`${this.resourceUrl}/${getSmscAccountIdentifier(smscAccount) as string}`, smscAccount, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISmscAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISmscAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSmscAccountToCollectionIfMissing(
    smscAccountCollection: ISmscAccount[],
    ...smscAccountsToCheck: (ISmscAccount | null | undefined)[]
  ): ISmscAccount[] {
    const smscAccounts: ISmscAccount[] = smscAccountsToCheck.filter(isPresent);
    if (smscAccounts.length > 0) {
      const smscAccountCollectionIdentifiers = smscAccountCollection.map(smscAccountItem => getSmscAccountIdentifier(smscAccountItem)!);
      const smscAccountsToAdd = smscAccounts.filter(smscAccountItem => {
        const smscAccountIdentifier = getSmscAccountIdentifier(smscAccountItem);
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
