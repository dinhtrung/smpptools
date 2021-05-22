import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITestSession, TestSession } from '../test-session.model';

import { TestSessionService } from './test-session.service';

describe('Service Tests', () => {
  describe('TestSession Service', () => {
    let service: TestSessionService;
    let httpMock: HttpTestingController;
    let elemDefault: ITestSession;
    let expectedResult: ITestSession | ITestSession[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TestSessionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        testSetup: 'AAAAAAA',
        trafficFileContentType: 'image/png',
        trafficFile: 'AAAAAAA',
        patternVariant: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TestSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TestSession()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TestSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            testSetup: 'BBBBBB',
            trafficFile: 'BBBBBB',
            patternVariant: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TestSession', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            trafficFile: 'BBBBBB',
            patternVariant: 'BBBBBB',
          },
          new TestSession()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TestSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            testSetup: 'BBBBBB',
            trafficFile: 'BBBBBB',
            patternVariant: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TestSession', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTestSessionToCollectionIfMissing', () => {
        it('should add a TestSession to an empty array', () => {
          const testSession: ITestSession = { id: 'ABC' };
          expectedResult = service.addTestSessionToCollectionIfMissing([], testSession);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(testSession);
        });

        it('should not add a TestSession to an array that contains it', () => {
          const testSession: ITestSession = { id: 'ABC' };
          const testSessionCollection: ITestSession[] = [
            {
              ...testSession,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addTestSessionToCollectionIfMissing(testSessionCollection, testSession);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TestSession to an array that doesn't contain it", () => {
          const testSession: ITestSession = { id: 'ABC' };
          const testSessionCollection: ITestSession[] = [{ id: 'CBA' }];
          expectedResult = service.addTestSessionToCollectionIfMissing(testSessionCollection, testSession);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(testSession);
        });

        it('should add only unique TestSession to an array', () => {
          const testSessionArray: ITestSession[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Up-sized Wisconsin' }];
          const testSessionCollection: ITestSession[] = [{ id: 'ABC' }];
          expectedResult = service.addTestSessionToCollectionIfMissing(testSessionCollection, ...testSessionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const testSession: ITestSession = { id: 'ABC' };
          const testSession2: ITestSession = { id: 'CBA' };
          expectedResult = service.addTestSessionToCollectionIfMissing([], testSession, testSession2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(testSession);
          expect(expectedResult).toContain(testSession2);
        });

        it('should accept null and undefined values', () => {
          const testSession: ITestSession = { id: 'ABC' };
          expectedResult = service.addTestSessionToCollectionIfMissing([], null, testSession, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(testSession);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
