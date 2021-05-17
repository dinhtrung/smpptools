import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IIsdnList, IsdnList } from '../isdn-list.model';

import { IsdnListService } from './isdn-list.service';

describe('Service Tests', () => {
  describe('IsdnList Service', () => {
    let service: IsdnListService;
    let httpMock: HttpTestingController;
    let elemDefault: IIsdnList;
    let expectedResult: IIsdnList | IIsdnList[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(IsdnListService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        content: 'AAAAAAA',
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

      it('should create a IsdnList', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new IsdnList()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a IsdnList', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            content: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a IsdnList', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            content: 'BBBBBB',
          },
          new IsdnList()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of IsdnList', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            content: 'BBBBBB',
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

      it('should delete a IsdnList', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addIsdnListToCollectionIfMissing', () => {
        it('should add a IsdnList to an empty array', () => {
          const isdnList: IIsdnList = { id: 'ABC' };
          expectedResult = service.addIsdnListToCollectionIfMissing([], isdnList);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(isdnList);
        });

        it('should not add a IsdnList to an array that contains it', () => {
          const isdnList: IIsdnList = { id: 'ABC' };
          const isdnListCollection: IIsdnList[] = [
            {
              ...isdnList,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addIsdnListToCollectionIfMissing(isdnListCollection, isdnList);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a IsdnList to an array that doesn't contain it", () => {
          const isdnList: IIsdnList = { id: 'ABC' };
          const isdnListCollection: IIsdnList[] = [{ id: 'CBA' }];
          expectedResult = service.addIsdnListToCollectionIfMissing(isdnListCollection, isdnList);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(isdnList);
        });

        it('should add only unique IsdnList to an array', () => {
          const isdnListArray: IIsdnList[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Shoes' }];
          const isdnListCollection: IIsdnList[] = [{ id: 'ABC' }];
          expectedResult = service.addIsdnListToCollectionIfMissing(isdnListCollection, ...isdnListArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const isdnList: IIsdnList = { id: 'ABC' };
          const isdnList2: IIsdnList = { id: 'CBA' };
          expectedResult = service.addIsdnListToCollectionIfMissing([], isdnList, isdnList2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(isdnList);
          expect(expectedResult).toContain(isdnList2);
        });

        it('should accept null and undefined values', () => {
          const isdnList: IIsdnList = { id: 'ABC' };
          expectedResult = service.addIsdnListToCollectionIfMissing([], null, isdnList, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(isdnList);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
