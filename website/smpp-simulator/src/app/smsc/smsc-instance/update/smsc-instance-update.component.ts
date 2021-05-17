import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISmscInstance, SmscInstance } from '../smsc-instance.model';
import { SmscInstanceService } from '../service/smsc-instance.service';

@Component({
  selector: 'jhi-smsc-instance-update',
  templateUrl: './smsc-instance-update.component.html',
})
export class SmscInstanceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(80)]],
    description: [],
    port: [],
    isPersist: [],
    connectionTimeout: [],
    windowSize: [],
  });

  constructor(protected smscInstanceService: SmscInstanceService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscInstance }) => {
      this.updateForm(smscInstance);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const smscInstance = this.createFromForm();
    if (smscInstance.id !== undefined) {
      this.subscribeToSaveResponse(this.smscInstanceService.update(smscInstance));
    } else {
      this.subscribeToSaveResponse(this.smscInstanceService.create(smscInstance));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISmscInstance>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(smscInstance: ISmscInstance): void {
    this.editForm.patchValue({
      id: smscInstance.id,
      name: smscInstance.name,
      description: smscInstance.description,
      port: smscInstance.port,
      isPersist: smscInstance.isPersist,
      connectionTimeout: smscInstance.connectionTimeout,
      windowSize: smscInstance.windowSize,
    });
  }

  protected createFromForm(): ISmscInstance {
    return {
      ...new SmscInstance(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      port: this.editForm.get(['port'])!.value,
      isPersist: this.editForm.get(['isPersist'])!.value,
      connectionTimeout: this.editForm.get(['connectionTimeout'])!.value,
      windowSize: this.editForm.get(['windowSize'])!.value,
    };
  }
}
