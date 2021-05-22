import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TestSessionService } from '../service/test-session.service';

import { TestSessionComponent } from './test-session.component';

describe('Component Tests', () => {
  describe('TestSession Management Component', () => {
    let comp: TestSessionComponent;
    let fixture: ComponentFixture<TestSessionComponent>;
    let service: TestSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TestSessionComponent],
      })
        .overrideTemplate(TestSessionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestSessionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TestSessionService);

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
      expect(comp.testSessions?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
