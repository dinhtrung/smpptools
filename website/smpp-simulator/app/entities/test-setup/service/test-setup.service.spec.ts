import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITestSetup, TestSetup } from '../test-setup.model';

import { TestSetupService } from './test-setup.service';

describe('Service Tests', () => {
  describe('TestSetup Service', () => {
    let service: TestSetupService;
    let httpMock: HttpTestingController;
    let elemDefault: ITestSetup;
    let expectedResult: ITestSetup | ITestSetup[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TestSetupService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        accountFileContentType: 'image/png',
        accountFile: 'AAAAAAA',
        connectionFileContentType: 'image/png',
        connectionFile: 'AAAAAAA',
        supplierFileContentType: 'image/png',
        supplierFile: 'AAAAAAA',
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

      it('should create a TestSetup', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TestSetup()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TestSetup', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            accountFile: 'BBBBBB',
            connectionFile: 'BBBBBB',
            supplierFile: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TestSetup', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            accountFile: 'BBBBBB',
            supplierFile: 'BBBBBB',
          },
          new TestSetup()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TestSetup', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            accountFile: 'BBBBBB',
            connectionFile: 'BBBBBB',
            supplierFile: 'BBBBBB',
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

      it('should delete a TestSetup', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTestSetupToCollectionIfMissing', () => {
        it('should add a TestSetup to an empty array', () => {
          const testSetup: ITestSetup = { id: 'ABC' };
          expectedResult = service.addTestSetupToCollectionIfMissing([], testSetup);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(testSetup);
        });

        it('should not add a TestSetup to an array that contains it', () => {
          const testSetup: ITestSetup = { id: 'ABC' };
          const testSetupCollection: ITestSetup[] = [
            {
              ...testSetup,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addTestSetupToCollectionIfMissing(testSetupCollection, testSetup);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TestSetup to an array that doesn't contain it", () => {
          const testSetup: ITestSetup = { id: 'ABC' };
          const testSetupCollection: ITestSetup[] = [{ id: 'CBA' }];
          expectedResult = service.addTestSetupToCollectionIfMissing(testSetupCollection, testSetup);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(testSetup);
        });

        it('should add only unique TestSetup to an array', () => {
          const testSetupArray: ITestSetup[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Producer' }];
          const testSetupCollection: ITestSetup[] = [{ id: 'ABC' }];
          expectedResult = service.addTestSetupToCollectionIfMissing(testSetupCollection, ...testSetupArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const testSetup: ITestSetup = { id: 'ABC' };
          const testSetup2: ITestSetup = { id: 'CBA' };
          expectedResult = service.addTestSetupToCollectionIfMissing([], testSetup, testSetup2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(testSetup);
          expect(expectedResult).toContain(testSetup2);
        });

        it('should accept null and undefined values', () => {
          const testSetup: ITestSetup = { id: 'ABC' };
          expectedResult = service.addTestSetupToCollectionIfMissing([], null, testSetup, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(testSetup);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
