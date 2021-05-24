import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { UploadFileDetailComponent } from './upload-file-detail.component';

describe('Component Tests', () => {
  describe('UploadFile Management Detail Component', () => {
    let comp: UploadFileDetailComponent;
    let fixture: ComponentFixture<UploadFileDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [UploadFileDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ uploadFile: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(UploadFileDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UploadFileDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load uploadFile on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.uploadFile).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeBase64, fakeContentType);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
      });
    });
  });
});
