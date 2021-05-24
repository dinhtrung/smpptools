import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITestSetup, getTestSetupIdentifier } from '../test-setup.model';

export type EntityResponseType = HttpResponse<ITestSetup>;
export type EntityArrayResponseType = HttpResponse<ITestSetup[]>;

@Injectable({ providedIn: 'root' })
export class TestSetupService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/test-setups', 'traffic-generator');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(testSetup: ITestSetup): Observable<EntityResponseType> {
    return this.http.post<ITestSetup>(this.resourceUrl, testSetup, { observe: 'response' });
  }

  update(testSetup: ITestSetup): Observable<EntityResponseType> {
    return this.http.put<ITestSetup>(`${this.resourceUrl}/${getTestSetupIdentifier(testSetup) as string}`, testSetup, {
      observe: 'response',
    });
  }

  partialUpdate(testSetup: ITestSetup): Observable<EntityResponseType> {
    return this.http.patch<ITestSetup>(`${this.resourceUrl}/${getTestSetupIdentifier(testSetup) as string}`, testSetup, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITestSetup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITestSetup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTestSetupToCollectionIfMissing(
    testSetupCollection: ITestSetup[],
    ...testSetupsToCheck: (ITestSetup | null | undefined)[]
  ): ITestSetup[] {
    const testSetups: ITestSetup[] = testSetupsToCheck.filter(isPresent);
    if (testSetups.length > 0) {
      const testSetupCollectionIdentifiers = testSetupCollection.map(testSetupItem => getTestSetupIdentifier(testSetupItem)!);
      const testSetupsToAdd = testSetups.filter(testSetupItem => {
        const testSetupIdentifier = getTestSetupIdentifier(testSetupItem);
        if (testSetupIdentifier == null || testSetupCollectionIdentifiers.includes(testSetupIdentifier)) {
          return false;
        }
        testSetupCollectionIdentifiers.push(testSetupIdentifier);
        return true;
      });
      return [...testSetupsToAdd, ...testSetupCollection];
    }
    return testSetupCollection;
  }
}
