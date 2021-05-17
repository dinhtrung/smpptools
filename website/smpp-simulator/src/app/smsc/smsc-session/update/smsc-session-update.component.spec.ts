jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SmscSessionService } from '../service/smsc-session.service';
import { ISmscSession, SmscSession } from '../smsc-session.model';

import { SmscSessionUpdateComponent } from './smsc-session-update.component';

describe('Component Tests', () => {
  describe('SmscSession Management Update Component', () => {
    let comp: SmscSessionUpdateComponent;
    let fixture: ComponentFixture<SmscSessionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let smscSessionService: SmscSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SmscSessionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SmscSessionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SmscSessionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      smscSessionService = TestBed.inject(SmscSessionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const smscSession: ISmscSession = { id: 'CBA' };

        activatedRoute.data = of({ smscSession });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(smscSession));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscSession = { id: 'ABC' };
        spyOn(smscSessionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: smscSession }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(smscSessionService.update).toHaveBeenCalledWith(smscSession);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscSession = new SmscSession();
        spyOn(smscSessionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: smscSession }));
        saveSubject.complete();

        // THEN
        expect(smscSessionService.create).toHaveBeenCalledWith(smscSession);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscSession = { id: 'ABC' };
        spyOn(smscSessionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(smscSessionService.update).toHaveBeenCalledWith(smscSession);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
