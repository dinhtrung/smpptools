import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUploadFile, UploadFile } from '../upload-file.model';

import { UploadFileService } from './upload-file.service';

describe('Service Tests', () => {
  describe('UploadFile Service', () => {
    let service: UploadFileService;
    let httpMock: HttpTestingController;
    let elemDefault: IUploadFile;
    let expectedResult: IUploadFile | IUploadFile[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(UploadFileService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        contentType: 'image/png',
        file: 'AAAAAAA',
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

      it('should create a UploadFile', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new UploadFile()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UploadFile', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            file: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a UploadFile', () => {
        const patchObject = Object.assign(
          {
            file: 'BBBBBB',
          },
          new UploadFile()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UploadFile', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            file: 'BBBBBB',
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

      it('should delete a UploadFile', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addUploadFileToCollectionIfMissing', () => {
        it('should add a UploadFile to an empty array', () => {
          const uploadFile: IUploadFile = { id: 'ABC' };
          expectedResult = service.addUploadFileToCollectionIfMissing([], uploadFile);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(uploadFile);
        });

        it('should not add a UploadFile to an array that contains it', () => {
          const uploadFile: IUploadFile = { id: 'ABC' };
          const uploadFileCollection: IUploadFile[] = [
            {
              ...uploadFile,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addUploadFileToCollectionIfMissing(uploadFileCollection, uploadFile);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a UploadFile to an array that doesn't contain it", () => {
          const uploadFile: IUploadFile = { id: 'ABC' };
          const uploadFileCollection: IUploadFile[] = [{ id: 'CBA' }];
          expectedResult = service.addUploadFileToCollectionIfMissing(uploadFileCollection, uploadFile);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(uploadFile);
        });

        it('should add only unique UploadFile to an array', () => {
          const uploadFileArray: IUploadFile[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Iraq plum' }];
          const uploadFileCollection: IUploadFile[] = [{ id: 'ABC' }];
          expectedResult = service.addUploadFileToCollectionIfMissing(uploadFileCollection, ...uploadFileArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const uploadFile: IUploadFile = { id: 'ABC' };
          const uploadFile2: IUploadFile = { id: 'CBA' };
          expectedResult = service.addUploadFileToCollectionIfMissing([], uploadFile, uploadFile2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(uploadFile);
          expect(expectedResult).toContain(uploadFile2);
        });

        it('should accept null and undefined values', () => {
          const uploadFile: IUploadFile = { id: 'ABC' };
          expectedResult = service.addUploadFileToCollectionIfMissing([], null, uploadFile, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(uploadFile);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
