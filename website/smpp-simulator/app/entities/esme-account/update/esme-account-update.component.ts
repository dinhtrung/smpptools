import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEsmeAccount, EsmeAccount } from '../esme-account.model';
import { EsmeAccountService } from '../service/esme-account.service';
import { SMPP_STATUS, SMPP_TON, SMPP_NPI } from 'app/config/smpp-error-codes.constants';

@Component({
  selector: 'jhi-esme-account-update',
  templateUrl: './esme-account-update.component.html',
})
export class EsmeAccountUpdateComponent implements OnInit {
  isSaving = false;
  smppStatus = SMPP_STATUS;
  smppTON = SMPP_TON;
  smppNPI = SMPP_NPI;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(80)]],
    description: [],
    isEnable: [],
    isPersist: [],
    numBinds: [],
    host: [],
    port: [null, [Validators.min(1)]],
    systemID: [],
    password: [],
    bindType: [],
    systemType: [],
    interfaceVersion: [],
    addressRange: [],
    addressTON: [],
    addressNPI: [],
    acceptRatio: this.fb.array([]),
    ackRatio: this.fb.array([]),
    mtThroughtput: [],
    enquireLinkInterval: [],
    connectionTimeout: [],
    windowSize: [],
    reconnectDelay: [],
  });

  constructor(
    protected esmeAccountService: EsmeAccountService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esmeAccount }) => {
      this.updateForm(esmeAccount);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const esmeAccount = this.createFromForm();
    if (esmeAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.esmeAccountService.update(esmeAccount));
    } else {
      this.subscribeToSaveResponse(this.esmeAccountService.create(esmeAccount));
    }
  }

  // Accept Ratio
  get AcceptRatio(): FormArray {
    return this.editForm.get('acceptRatio') as FormArray;
  }

  addAcceptRatio(): void {
    this.AcceptRatio.push(this.fb.group({ error: '', rate: '' }));
  }

  delAcceptRatio(index: number): void {
    this.AcceptRatio.removeAt(index);
  }

  patchAcceptRatio(account: IEsmeAccount): void {
    this.AcceptRatio.clear();
    if (account.acceptRatio) {
      for (const entry of account.acceptRatio) {
        this.AcceptRatio.push(this.fb.group(entry));
      }
    }
  }

  // Acknowledgement Ratio
  get AckRatio(): FormArray {
    return this.editForm.get('ackRatio') as FormArray;
  }

  addAckRatio(): void {
    this.AckRatio.push(this.fb.group({ error: '', rate: '' }));
  }

  delAckRatio(index: number): void {
    this.AckRatio.removeAt(index);
  }

  patchAckRatio(account: IEsmeAccount): void {
    this.AckRatio.clear();
    if (account.ackRatio) {
      for (const entry of account.ackRatio) {
        this.AckRatio.push(this.fb.group(entry));
      }
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEsmeAccount>>): void {
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

  protected updateForm(esmeAccount: IEsmeAccount): void {
    this.editForm.patchValue({
      id: esmeAccount.id,
      name: esmeAccount.name,
      description: esmeAccount.description,
      isEnable: esmeAccount.isEnable,
      isPersist: esmeAccount.isPersist,
      numBinds: esmeAccount.numBinds,
      host: esmeAccount.host,
      port: esmeAccount.port,
      systemID: esmeAccount.systemID,
      password: esmeAccount.password,
      bindType: esmeAccount.bindType,
      systemType: esmeAccount.systemType,
      interfaceVersion: esmeAccount.interfaceVersion,
      addressRange: esmeAccount.addressRange,
      addressTON: esmeAccount.addressTON,
      addressNPI: esmeAccount.addressNPI,
      mtThroughtput: esmeAccount.mtThroughtput,
      enquireLinkInterval: esmeAccount.enquireLinkInterval,
      connectionTimeout: esmeAccount.connectionTimeout,
      windowSize: esmeAccount.windowSize,
      reconnectDelay: esmeAccount.reconnectDelay,
    });
    this.patchAckRatio(esmeAccount);
    this.patchAcceptRatio(esmeAccount);
  }

  protected createFromForm(): IEsmeAccount {
    return {
      ...new EsmeAccount(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      isEnable: this.editForm.get(['isEnable'])!.value,
      isPersist: this.editForm.get(['isPersist'])!.value,
      numBinds: this.editForm.get(['numBinds'])!.value,
      host: this.editForm.get(['host'])!.value,
      port: this.editForm.get(['port'])!.value,
      systemID: this.editForm.get(['systemID'])!.value,
      password: this.editForm.get(['password'])!.value,
      bindType: this.editForm.get(['bindType'])!.value,
      systemType: this.editForm.get(['systemType'])!.value,
      interfaceVersion: this.editForm.get(['interfaceVersion'])!.value,
      addressRange: this.editForm.get(['addressRange'])!.value,
      addressTON: this.editForm.get(['addressTON'])!.value,
      addressNPI: this.editForm.get(['addressNPI'])!.value,
      ackRatio: this.editForm.get(['ackRatio'])!.value,
      acceptRatio: this.editForm.get(['acceptRatio'])!.value,
      mtThroughtput: this.editForm.get(['mtThroughtput'])!.value,
      enquireLinkInterval: this.editForm.get(['enquireLinkInterval'])!.value,
      connectionTimeout: this.editForm.get(['connectionTimeout'])!.value,
      windowSize: this.editForm.get(['windowSize'])!.value,
      reconnectDelay: this.editForm.get(['reconnectDelay'])!.value,
    };
  }
}
