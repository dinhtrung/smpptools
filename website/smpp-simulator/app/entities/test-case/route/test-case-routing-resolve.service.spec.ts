jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITestCase, TestCase } from '../test-case.model';
import { TestCaseService } from '../service/test-case.service';

import { TestCaseRoutingResolveService } from './test-case-routing-resolve.service';

describe('Service Tests', () => {
  describe('TestCase routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TestCaseRoutingResolveService;
    let service: TestCaseService;
    let resultTestCase: ITestCase | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TestCaseRoutingResolveService);
      service = TestBed.inject(TestCaseService);
      resultTestCase = undefined;
    });

    describe('resolve', () => {
      it('should return ITestCase returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestCase = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultTestCase).toEqual({ id: 'ABC' });
      });

      it('should return new ITestCase if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestCase = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTestCase).toEqual(new TestCase());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestCase = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultTestCase).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
