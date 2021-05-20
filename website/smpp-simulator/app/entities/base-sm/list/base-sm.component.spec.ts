import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BaseSmService } from '../service/base-sm.service';

import { BaseSmComponent } from './base-sm.component';

describe('Component Tests', () => {
  describe('BaseSm Management Component', () => {
    let comp: BaseSmComponent;
    let fixture: ComponentFixture<BaseSmComponent>;
    let service: BaseSmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BaseSmComponent],
      })
        .overrideTemplate(BaseSmComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BaseSmComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(BaseSmService);

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
      expect(comp.baseSms?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
