jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EsmeSessionService } from '../service/esme-session.service';
import { IEsmeSession, EsmeSession } from '../esme-session.model';

import { EsmeSessionUpdateComponent } from './esme-session-update.component';

describe('Component Tests', () => {
  describe('EsmeSession Management Update Component', () => {
    let comp: EsmeSessionUpdateComponent;
    let fixture: ComponentFixture<EsmeSessionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let esmeAccountService: EsmeSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EsmeSessionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EsmeSessionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EsmeSessionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      esmeAccountService = TestBed.inject(EsmeSessionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const esmeAccount: IEsmeSession = { id: 'CBA' };

        activatedRoute.data = of({ esmeAccount });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(esmeAccount));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const esmeAccount = { id: 'ABC' };
        spyOn(esmeAccountService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ esmeAccount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: esmeAccount }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(esmeAccountService.update).toHaveBeenCalledWith(esmeAccount);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const esmeAccount = new EsmeSession();
        spyOn(esmeAccountService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ esmeAccount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: esmeAccount }));
        saveSubject.complete();

        // THEN
        expect(esmeAccountService.create).toHaveBeenCalledWith(esmeAccount);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const esmeAccount = { id: 'ABC' };
        spyOn(esmeAccountService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ esmeAccount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(esmeAccountService.update).toHaveBeenCalledWith(esmeAccount);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
