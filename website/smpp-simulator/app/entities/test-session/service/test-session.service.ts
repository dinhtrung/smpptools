import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITestSession, getTestSessionIdentifier } from '../test-session.model';

export type EntityResponseType = HttpResponse<ITestSession>;
export type EntityArrayResponseType = HttpResponse<ITestSession[]>;

@Injectable({ providedIn: 'root' })
export class TestSessionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/test-sessions', 'traffic-generator');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(testSession: ITestSession): Observable<EntityResponseType> {
    return this.http.post<ITestSession>(this.resourceUrl, testSession, { observe: 'response' });
  }

  update(testSession: ITestSession): Observable<EntityResponseType> {
    return this.http.put<ITestSession>(`${this.resourceUrl}/${getTestSessionIdentifier(testSession) as string}`, testSession, {
      observe: 'response',
    });
  }

  partialUpdate(testSession: ITestSession): Observable<EntityResponseType> {
    return this.http.patch<ITestSession>(`${this.resourceUrl}/${getTestSessionIdentifier(testSession) as string}`, testSession, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITestSession>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITestSession[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTestSessionToCollectionIfMissing(
    testSessionCollection: ITestSession[],
    ...testSessionsToCheck: (ITestSession | null | undefined)[]
  ): ITestSession[] {
    const testSessions: ITestSession[] = testSessionsToCheck.filter(isPresent);
    if (testSessions.length > 0) {
      const testSessionCollectionIdentifiers = testSessionCollection.map(testSessionItem => getTestSessionIdentifier(testSessionItem)!);
      const testSessionsToAdd = testSessions.filter(testSessionItem => {
        const testSessionIdentifier = getTestSessionIdentifier(testSessionItem);
        if (testSessionIdentifier == null || testSessionCollectionIdentifiers.includes(testSessionIdentifier)) {
          return false;
        }
        testSessionCollectionIdentifiers.push(testSessionIdentifier);
        return true;
      });
      return [...testSessionsToAdd, ...testSessionCollection];
    }
    return testSessionCollection;
  }
}
