import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITestCase, getTestCaseIdentifier } from '../test-case.model';

export type EntityResponseType = HttpResponse<ITestCase>;
export type EntityArrayResponseType = HttpResponse<ITestCase[]>;

@Injectable({ providedIn: 'root' })
export class TestCaseService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/test-cases');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ITestCase>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITestCase[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addTestCaseToCollectionIfMissing(testCaseCollection: ITestCase[], ...testCasesToCheck: (ITestCase | null | undefined)[]): ITestCase[] {
    const testCases: ITestCase[] = testCasesToCheck.filter(isPresent);
    if (testCases.length > 0) {
      const testCaseCollectionIdentifiers = testCaseCollection.map(testCaseItem => getTestCaseIdentifier(testCaseItem)!);
      const testCasesToAdd = testCases.filter(testCaseItem => {
        const testCaseIdentifier = getTestCaseIdentifier(testCaseItem);
        if (testCaseIdentifier == null || testCaseCollectionIdentifiers.includes(testCaseIdentifier)) {
          return false;
        }
        testCaseCollectionIdentifiers.push(testCaseIdentifier);
        return true;
      });
      return [...testCasesToAdd, ...testCaseCollection];
    }
    return testCaseCollection;
  }

  protected convertDateFromClient(testCase: ITestCase): ITestCase {
    return Object.assign({}, testCase, {
      createdAt: testCase.createdAt?.isValid() ? testCase.createdAt.toJSON() : undefined,
      updatedAt: testCase.updatedAt?.isValid() ? testCase.updatedAt.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? dayjs(res.body.createdAt) : undefined;
      res.body.updatedAt = res.body.updatedAt ? dayjs(res.body.updatedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((testCase: ITestCase) => {
        testCase.createdAt = testCase.createdAt ? dayjs(testCase.createdAt) : undefined;
        testCase.updatedAt = testCase.updatedAt ? dayjs(testCase.updatedAt) : undefined;
      });
    }
    return res;
  }
}
