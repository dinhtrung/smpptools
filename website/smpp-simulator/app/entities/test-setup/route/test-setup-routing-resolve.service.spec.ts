jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITestSetup, TestSetup } from '../test-setup.model';
import { TestSetupService } from '../service/test-setup.service';

import { TestSetupRoutingResolveService } from './test-setup-routing-resolve.service';

describe('Service Tests', () => {
  describe('TestSetup routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TestSetupRoutingResolveService;
    let service: TestSetupService;
    let resultTestSetup: ITestSetup | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TestSetupRoutingResolveService);
      service = TestBed.inject(TestSetupService);
      resultTestSetup = undefined;
    });

    describe('resolve', () => {
      it('should return ITestSetup returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestSetup = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultTestSetup).toEqual({ id: 'ABC' });
      });

      it('should return new ITestSetup if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestSetup = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTestSetup).toEqual(new TestSetup());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestSetup = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultTestSetup).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
