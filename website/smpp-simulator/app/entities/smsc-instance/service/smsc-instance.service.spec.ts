import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISmscInstance, SmscInstance } from '../smsc-instance.model';

import { SmscInstanceService } from './smsc-instance.service';

describe('Service Tests', () => {
  describe('SmscInstance Service', () => {
    let service: SmscInstanceService;
    let httpMock: HttpTestingController;
    let elemDefault: ISmscInstance;
    let expectedResult: ISmscInstance | ISmscInstance[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SmscInstanceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        port: 0,
        isPersist: false,
        connectionTimeout: 0,
        windowSize: 0,
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

      it('should create a SmscInstance', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SmscInstance()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SmscInstance', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            port: 1,
            isPersist: true,
            connectionTimeout: 1,
            windowSize: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a SmscInstance', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            isPersist: true,
          },
          new SmscInstance()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SmscInstance', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            port: 1,
            isPersist: true,
            connectionTimeout: 1,
            windowSize: 1,
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

      it('should delete a SmscInstance', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSmscInstanceToCollectionIfMissing', () => {
        it('should add a SmscInstance to an empty array', () => {
          const smscInstance: ISmscInstance = { id: 'ABC' };
          expectedResult = service.addSmscInstanceToCollectionIfMissing([], smscInstance);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(smscInstance);
        });

        it('should not add a SmscInstance to an array that contains it', () => {
          const smscInstance: ISmscInstance = { id: 'ABC' };
          const smscInstanceCollection: ISmscInstance[] = [
            {
              ...smscInstance,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addSmscInstanceToCollectionIfMissing(smscInstanceCollection, smscInstance);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SmscInstance to an array that doesn't contain it", () => {
          const smscInstance: ISmscInstance = { id: 'ABC' };
          const smscInstanceCollection: ISmscInstance[] = [{ id: 'CBA' }];
          expectedResult = service.addSmscInstanceToCollectionIfMissing(smscInstanceCollection, smscInstance);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(smscInstance);
        });

        it('should add only unique SmscInstance to an array', () => {
          const smscInstanceArray: ISmscInstance[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Response Sleek' }];
          const smscInstanceCollection: ISmscInstance[] = [{ id: 'ABC' }];
          expectedResult = service.addSmscInstanceToCollectionIfMissing(smscInstanceCollection, ...smscInstanceArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const smscInstance: ISmscInstance = { id: 'ABC' };
          const smscInstance2: ISmscInstance = { id: 'CBA' };
          expectedResult = service.addSmscInstanceToCollectionIfMissing([], smscInstance, smscInstance2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(smscInstance);
          expect(expectedResult).toContain(smscInstance2);
        });

        it('should accept null and undefined values', () => {
          const smscInstance: ISmscInstance = { id: 'ABC' };
          expectedResult = service.addSmscInstanceToCollectionIfMissing([], null, smscInstance, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(smscInstance);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
