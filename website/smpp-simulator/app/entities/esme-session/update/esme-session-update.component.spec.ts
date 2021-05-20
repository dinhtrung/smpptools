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
    let esmeSessionService: EsmeSessionService;

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
      esmeSessionService = TestBed.inject(EsmeSessionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const esmeSession: IEsmeSession = { id: 'CBA' };

        activatedRoute.data = of({ esmeSession });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(esmeSession));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const esmeSession = { id: 'ABC' };
        spyOn(esmeSessionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ esmeSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: esmeSession }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(esmeSessionService.update).toHaveBeenCalledWith(esmeSession);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const esmeSession = new EsmeSession();
        spyOn(esmeSessionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ esmeSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: esmeSession }));
        saveSubject.complete();

        // THEN
        expect(esmeSessionService.create).toHaveBeenCalledWith(esmeSession);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const esmeSession = { id: 'ABC' };
        spyOn(esmeSessionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ esmeSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(esmeSessionService.update).toHaveBeenCalledWith(esmeSession);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
