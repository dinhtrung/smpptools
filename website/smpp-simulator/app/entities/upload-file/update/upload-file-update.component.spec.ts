jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { UploadFileService } from '../service/upload-file.service';
import { IUploadFile, UploadFile } from '../upload-file.model';

import { UploadFileUpdateComponent } from './upload-file-update.component';

describe('Component Tests', () => {
  describe('UploadFile Management Update Component', () => {
    let comp: UploadFileUpdateComponent;
    let fixture: ComponentFixture<UploadFileUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let uploadFileService: UploadFileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UploadFileUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(UploadFileUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UploadFileUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      uploadFileService = TestBed.inject(UploadFileService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const uploadFile: IUploadFile = { id: 'CBA' };

        activatedRoute.data = of({ uploadFile });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(uploadFile));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const uploadFile = { id: 'ABC' };
        spyOn(uploadFileService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ uploadFile });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: uploadFile }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(uploadFileService.update).toHaveBeenCalledWith(uploadFile);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const uploadFile = new UploadFile();
        spyOn(uploadFileService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ uploadFile });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: uploadFile }));
        saveSubject.complete();

        // THEN
        expect(uploadFileService.create).toHaveBeenCalledWith(uploadFile);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const uploadFile = { id: 'ABC' };
        spyOn(uploadFileService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ uploadFile });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(uploadFileService.update).toHaveBeenCalledWith(uploadFile);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
