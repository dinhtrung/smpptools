import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITestCase } from '../test-case.model';

import { TestCaseService } from './test-case.service';

describe('Service Tests', () => {
  describe('TestCase Service', () => {
    let service: TestCaseService;
    let httpMock: HttpTestingController;
    let elemDefault: ITestCase;
    let expectedResult: ITestCase | ITestCase[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TestCaseService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        testSession: 'AAAAAAA',
        state: 0,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            updatedAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of TestCase', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            testSession: 'BBBBBB',
            state: 1,
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            updatedAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
            updatedAt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      describe('addTestCaseToCollectionIfMissing', () => {
        it('should add a TestCase to an empty array', () => {
          const testCase: ITestCase = { id: 'ABC' };
          expectedResult = service.addTestCaseToCollectionIfMissing([], testCase);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(testCase);
        });

        it('should not add a TestCase to an array that contains it', () => {
          const testCase: ITestCase = { id: 'ABC' };
          const testCaseCollection: ITestCase[] = [
            {
              ...testCase,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addTestCaseToCollectionIfMissing(testCaseCollection, testCase);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TestCase to an array that doesn't contain it", () => {
          const testCase: ITestCase = { id: 'ABC' };
          const testCaseCollection: ITestCase[] = [{ id: 'CBA' }];
          expectedResult = service.addTestCaseToCollectionIfMissing(testCaseCollection, testCase);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(testCase);
        });

        it('should add only unique TestCase to an array', () => {
          const testCaseArray: ITestCase[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Account' }];
          const testCaseCollection: ITestCase[] = [{ id: 'ABC' }];
          expectedResult = service.addTestCaseToCollectionIfMissing(testCaseCollection, ...testCaseArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const testCase: ITestCase = { id: 'ABC' };
          const testCase2: ITestCase = { id: 'CBA' };
          expectedResult = service.addTestCaseToCollectionIfMissing([], testCase, testCase2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(testCase);
          expect(expectedResult).toContain(testCase2);
        });

        it('should accept null and undefined values', () => {
          const testCase: ITestCase = { id: 'ABC' };
          expectedResult = service.addTestCaseToCollectionIfMissing([], null, testCase, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(testCase);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
