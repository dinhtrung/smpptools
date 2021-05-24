import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UploadFileService } from '../service/upload-file.service';

import { UploadFileComponent } from './upload-file.component';

describe('Component Tests', () => {
  describe('UploadFile Management Component', () => {
    let comp: UploadFileComponent;
    let fixture: ComponentFixture<UploadFileComponent>;
    let service: UploadFileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UploadFileComponent],
      })
        .overrideTemplate(UploadFileComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UploadFileComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(UploadFileService);

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
      expect(comp.uploadFiles?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
