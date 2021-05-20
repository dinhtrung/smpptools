import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { DataFileDetailComponent } from './data-file-detail.component';

describe('Component Tests', () => {
  describe('DataFile Management Detail Component', () => {
    let comp: DataFileDetailComponent;
    let fixture: ComponentFixture<DataFileDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DataFileDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ dataFile: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(DataFileDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DataFileDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load dataFile on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dataFile).toEqual(jasmine.objectContaining({ id: 'ABC' }));
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
