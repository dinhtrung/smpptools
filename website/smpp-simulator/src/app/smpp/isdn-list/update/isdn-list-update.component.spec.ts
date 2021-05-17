jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { IsdnListService } from '../service/isdn-list.service';
import { IIsdnList, IsdnList } from '../isdn-list.model';

import { IsdnListUpdateComponent } from './isdn-list-update.component';

describe('Component Tests', () => {
  describe('IsdnList Management Update Component', () => {
    let comp: IsdnListUpdateComponent;
    let fixture: ComponentFixture<IsdnListUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let isdnListService: IsdnListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [IsdnListUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(IsdnListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IsdnListUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      isdnListService = TestBed.inject(IsdnListService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const isdnList: IIsdnList = { id: 'CBA' };

        activatedRoute.data = of({ isdnList });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(isdnList));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const isdnList = { id: 'ABC' };
        spyOn(isdnListService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ isdnList });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: isdnList }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(isdnListService.update).toHaveBeenCalledWith(isdnList);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const isdnList = new IsdnList();
        spyOn(isdnListService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ isdnList });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: isdnList }));
        saveSubject.complete();

        // THEN
        expect(isdnListService.create).toHaveBeenCalledWith(isdnList);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const isdnList = { id: 'ABC' };
        spyOn(isdnListService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ isdnList });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(isdnListService.update).toHaveBeenCalledWith(isdnList);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
