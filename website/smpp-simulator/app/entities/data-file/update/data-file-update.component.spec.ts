jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DataFileService } from '../service/data-file.service';
import { IDataFile, DataFile } from '../data-file.model';

import { DataFileUpdateComponent } from './data-file-update.component';

describe('Component Tests', () => {
  describe('DataFile Management Update Component', () => {
    let comp: DataFileUpdateComponent;
    let fixture: ComponentFixture<DataFileUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let dataFileService: DataFileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DataFileUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DataFileUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DataFileUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      dataFileService = TestBed.inject(DataFileService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const dataFile: IDataFile = { id: 'CBA' };

        activatedRoute.data = of({ dataFile });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(dataFile));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const dataFile = { id: 'ABC' };
        spyOn(dataFileService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ dataFile });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: dataFile }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(dataFileService.update).toHaveBeenCalledWith(dataFile);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const dataFile = new DataFile();
        spyOn(dataFileService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ dataFile });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: dataFile }));
        saveSubject.complete();

        // THEN
        expect(dataFileService.create).toHaveBeenCalledWith(dataFile);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const dataFile = { id: 'ABC' };
        spyOn(dataFileService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ dataFile });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(dataFileService.update).toHaveBeenCalledWith(dataFile);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
