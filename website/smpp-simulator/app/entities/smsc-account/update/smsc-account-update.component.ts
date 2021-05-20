import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISmscAccount, SmscAccount } from '../smsc-account.model';
import { SmscAccountService } from '../service/smsc-account.service';
import { SMPP_STATUS, SMPP_TON, SMPP_NPI, SMPP_DLR } from 'app/config/smpp-error-codes.constants';
@Component({
  selector: 'jhi-smsc-account-update',
  templateUrl: './smsc-account-update.component.html',
})
export class SmscAccountUpdateComponent implements OnInit {
  isSaving = false;
  smppStatus = SMPP_STATUS;
  smppTON = SMPP_TON;
  smppNPI = SMPP_NPI;
  smppDLR = SMPP_DLR;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(80)]],
    description: [],
    systemID: [null, [Validators.required]],
    password: [null, [Validators.required]],
    bindType: [],
    systemType: [],
    interfaceVersion: [],
    addressRange: [],
    addressTON: [],
    addressNPI: [],
    maxBinds: [],
    acceptRatio: this.fb.array([]),
    deliveryRatio: this.fb.array([]),
  });

  constructor(protected smscAccountService: SmscAccountService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscAccount }) => {
      this.updateForm(smscAccount);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const smscAccount = this.createFromForm();
    if (smscAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.smscAccountService.update(smscAccount));
    } else {
      this.subscribeToSaveResponse(this.smscAccountService.create(smscAccount));
    }
  }

  // TLV List
  get AcceptRatio(): FormArray {
    return this.editForm.get('acceptRatio') as FormArray;
  }

  addAcceptRatio(): void {
    this.AcceptRatio.push(this.fb.group({ error: '', rate: '' }));
  }

  delAcceptRatio(index: number): void {
    this.AcceptRatio.removeAt(index);
  }

  patchAcceptRatio(smscAccount: ISmscAccount): void {
    this.AcceptRatio.clear();
    if (smscAccount.acceptRatio) {
      for (const entry of smscAccount.acceptRatio) {
        this.AcceptRatio.push(this.fb.group(entry));
      }
    }
  }

  // TLV List
  get DeliveryRatio(): FormArray {
    return this.editForm.get('deliveryRatio') as FormArray;
  }

  addDeliveryRatio(): void {
    this.DeliveryRatio.push(this.fb.group({ error: '', rate: '' }));
  }

  delDeliveryRatio(index: number): void {
    this.DeliveryRatio.removeAt(index);
  }

  patchDeliveryRatio(smscAccount: ISmscAccount): void {
    this.DeliveryRatio.clear();
    if (smscAccount.deliveryRatio) {
      for (const entry of smscAccount.deliveryRatio) {
        this.DeliveryRatio.push(this.fb.group(entry));
      }
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISmscAccount>>): void {
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

  protected updateForm(smscAccount: ISmscAccount): void {
    this.editForm.patchValue({
      id: smscAccount.id,
      name: smscAccount.name,
      description: smscAccount.description,
      maxBinds: smscAccount.maxBinds,
      systemID: smscAccount.systemID,
      password: smscAccount.password,
      bindType: smscAccount.bindType,
      addressRange: smscAccount.addressRange,
      addressTON: smscAccount.addressTON,
      addressNPI: smscAccount.addressNPI,
    });
    this.patchAcceptRatio(smscAccount);
    this.patchDeliveryRatio(smscAccount);
  }

  protected createFromForm(): ISmscAccount {
    return {
      ...new SmscAccount(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      maxBinds: this.editForm.get(['maxBinds'])!.value,
      systemID: this.editForm.get(['systemID'])!.value,
      password: this.editForm.get(['password'])!.value,
      bindType: this.editForm.get(['bindType'])!.value,
      addressRange: this.editForm.get(['addressRange'])!.value,
      addressTON: this.editForm.get(['addressTON'])!.value,
      addressNPI: this.editForm.get(['addressNPI'])!.value,
      acceptRatio: this.editForm.get(['acceptRatio'])!.value,
      deliveryRatio: this.editForm.get(['deliveryRatio'])!.value,
    };
  }
}
