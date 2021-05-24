import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TestCaseService } from '../service/test-case.service';

import { TestCaseComponent } from './test-case.component';

describe('Component Tests', () => {
  describe('TestCase Management Component', () => {
    let comp: TestCaseComponent;
    let fixture: ComponentFixture<TestCaseComponent>;
    let service: TestCaseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TestCaseComponent],
      })
        .overrideTemplate(TestCaseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestCaseComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TestCaseService);

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
      expect(comp.testCases?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
