jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IUploadFile, UploadFile } from '../upload-file.model';
import { UploadFileService } from '../service/upload-file.service';

import { UploadFileRoutingResolveService } from './upload-file-routing-resolve.service';

describe('Service Tests', () => {
  describe('UploadFile routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: UploadFileRoutingResolveService;
    let service: UploadFileService;
    let resultUploadFile: IUploadFile | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(UploadFileRoutingResolveService);
      service = TestBed.inject(UploadFileService);
      resultUploadFile = undefined;
    });

    describe('resolve', () => {
      it('should return IUploadFile returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUploadFile = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultUploadFile).toEqual({ id: 'ABC' });
      });

      it('should return new IUploadFile if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUploadFile = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultUploadFile).toEqual(new UploadFile());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUploadFile = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultUploadFile).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
