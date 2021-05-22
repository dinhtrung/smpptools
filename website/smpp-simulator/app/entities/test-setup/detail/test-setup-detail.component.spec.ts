import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { TestSetupDetailComponent } from './test-setup-detail.component';

describe('Component Tests', () => {
  describe('TestSetup Management Detail Component', () => {
    let comp: TestSetupDetailComponent;
    let fixture: ComponentFixture<TestSetupDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestSetupDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ testSetup: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(TestSetupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TestSetupDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load testSetup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.testSetup).toEqual(jasmine.objectContaining({ id: 'ABC' }));
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
