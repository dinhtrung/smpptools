import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SmscInstanceService } from '../service/smsc-instance.service';

import { SmscInstanceComponent } from './smsc-instance.component';

describe('Component Tests', () => {
  describe('SmscInstance Management Component', () => {
    let comp: SmscInstanceComponent;
    let fixture: ComponentFixture<SmscInstanceComponent>;
    let service: SmscInstanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SmscInstanceComponent],
      })
        .overrideTemplate(SmscInstanceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SmscInstanceComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SmscInstanceService);

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
      expect(comp.smscInstances?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
