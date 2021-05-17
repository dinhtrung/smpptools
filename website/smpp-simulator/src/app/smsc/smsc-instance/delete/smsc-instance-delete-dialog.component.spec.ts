jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SmscInstanceService } from '../service/smsc-instance.service';

import { SmscInstanceDeleteDialogComponent } from './smsc-instance-delete-dialog.component';

describe('Component Tests', () => {
  describe('SmscInstance Management Delete Component', () => {
    let comp: SmscInstanceDeleteDialogComponent;
    let fixture: ComponentFixture<SmscInstanceDeleteDialogComponent>;
    let service: SmscInstanceService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SmscInstanceDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(SmscInstanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SmscInstanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SmscInstanceService);
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
