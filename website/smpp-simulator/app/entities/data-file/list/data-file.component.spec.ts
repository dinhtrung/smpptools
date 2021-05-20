import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DataFileService } from '../service/data-file.service';

import { DataFileComponent } from './data-file.component';

describe('Component Tests', () => {
  describe('DataFile Management Component', () => {
    let comp: DataFileComponent;
    let fixture: ComponentFixture<DataFileComponent>;
    let service: DataFileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DataFileComponent],
      })
        .overrideTemplate(DataFileComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DataFileComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DataFileService);

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
      expect(comp.dataFiles?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
