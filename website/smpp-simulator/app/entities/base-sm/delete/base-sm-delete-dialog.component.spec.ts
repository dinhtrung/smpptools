jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { BaseSmService } from '../service/base-sm.service';

import { BaseSmDeleteDialogComponent } from './base-sm-delete-dialog.component';

describe('Component Tests', () => {
  describe('BaseSm Management Delete Component', () => {
    let comp: BaseSmDeleteDialogComponent;
    let fixture: ComponentFixture<BaseSmDeleteDialogComponent>;
    let service: BaseSmService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BaseSmDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(BaseSmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BaseSmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(BaseSmService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('ABC');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('ABC');
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
