import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TestSetupService } from '../service/test-setup.service';

import { TestSetupComponent } from './test-setup.component';

describe('Component Tests', () => {
  describe('TestSetup Management Component', () => {
    let comp: TestSetupComponent;
    let fixture: ComponentFixture<TestSetupComponent>;
    let service: TestSetupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TestSetupComponent],
      })
        .overrideTemplate(TestSetupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestSetupComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TestSetupService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 'ABC' }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.testSetups?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
