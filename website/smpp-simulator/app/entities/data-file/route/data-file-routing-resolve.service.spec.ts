jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDataFile, DataFile } from '../data-file.model';
import { DataFileService } from '../service/data-file.service';

import { DataFileRoutingResolveService } from './data-file-routing-resolve.service';

describe('Service Tests', () => {
  describe('DataFile routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DataFileRoutingResolveService;
    let service: DataFileService;
    let resultDataFile: IDataFile | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DataFileRoutingResolveService);
      service = TestBed.inject(DataFileService);
      resultDataFile = undefined;
    });

    describe('resolve', () => {
      it('should return IDataFile returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDataFile = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultDataFile).toEqual({ id: 'ABC' });
      });

      it('should return new IDataFile if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDataFile = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDataFile).toEqual(new DataFile());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDataFile = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultDataFile).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
