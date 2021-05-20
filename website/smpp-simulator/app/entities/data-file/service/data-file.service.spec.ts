import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDataFile, DataFile } from '../data-file.model';

import { DataFileService } from './data-file.service';

describe('Service Tests', () => {
  describe('DataFile Service', () => {
    let service: DataFileService;
    let httpMock: HttpTestingController;
    let elemDefault: IDataFile;
    let expectedResult: IDataFile | IDataFile[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DataFileService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        fileIDContentType: 'image/png',
        fileID: 'AAAAAAA',
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

      it('should create a DataFile', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DataFile()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DataFile', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            fileID: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DataFile', () => {
        const patchObject = Object.assign(
          {
            fileID: 'BBBBBB',
          },
          new DataFile()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DataFile', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            fileID: 'BBBBBB',
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

      it('should delete a DataFile', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDataFileToCollectionIfMissing', () => {
        it('should add a DataFile to an empty array', () => {
          const dataFile: IDataFile = { id: 'ABC' };
          expectedResult = service.addDataFileToCollectionIfMissing([], dataFile);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(dataFile);
        });

        it('should not add a DataFile to an array that contains it', () => {
          const dataFile: IDataFile = { id: 'ABC' };
          const dataFileCollection: IDataFile[] = [
            {
              ...dataFile,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addDataFileToCollectionIfMissing(dataFileCollection, dataFile);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DataFile to an array that doesn't contain it", () => {
          const dataFile: IDataFile = { id: 'ABC' };
          const dataFileCollection: IDataFile[] = [{ id: 'CBA' }];
          expectedResult = service.addDataFileToCollectionIfMissing(dataFileCollection, dataFile);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(dataFile);
        });

        it('should add only unique DataFile to an array', () => {
          const dataFileArray: IDataFile[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'scale array' }];
          const dataFileCollection: IDataFile[] = [{ id: 'ABC' }];
          expectedResult = service.addDataFileToCollectionIfMissing(dataFileCollection, ...dataFileArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const dataFile: IDataFile = { id: 'ABC' };
          const dataFile2: IDataFile = { id: 'CBA' };
          expectedResult = service.addDataFileToCollectionIfMissing([], dataFile, dataFile2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(dataFile);
          expect(expectedResult).toContain(dataFile2);
        });

        it('should accept null and undefined values', () => {
          const dataFile: IDataFile = { id: 'ABC' };
          expectedResult = service.addDataFileToCollectionIfMissing([], null, dataFile, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(dataFile);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
