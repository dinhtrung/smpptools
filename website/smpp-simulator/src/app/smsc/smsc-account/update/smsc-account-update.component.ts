import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
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

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(80)]],
    description: [],
    maxBinds: [],
    systemID: [null, [Validators.required]],
    password: [null, [Validators.required]],
    bindType: [],
    addressRange: [],
    addressTON: [],
    addressNPI: [],
    moErrorRate: [null, [Validators.min(0), Validators.max(100)]],
    moErrorCode: [null, [Validators.min(0)]],
    dlrErrorRate: [null, [Validators.min(0), Validators.max(100)]],
    dlrErrorCode: [null, [Validators.min(0)]],
  });
  smppTON = SMPP_TON;
  smppNPI = SMPP_NPI;
  smppStatus = SMPP_STATUS;
  smppDLRStatus = SMPP_DLR;

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
    if (smscAccount.id) {
      this.subscribeToSaveResponse(this.smscAccountService.update(smscAccount));
    } else {
      delete smscAccount.id;
      this.subscribeToSaveResponse(this.smscAccountService.create(smscAccount));
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
      moErrorRate: smscAccount.moErrorRate,
      moErrorCode: smscAccount.moErrorCode,
      dlrErrorRate: smscAccount.dlrErrorRate,
      dlrErrorCode: smscAccount.dlrErrorCode,
    });
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
      moErrorRate: this.editForm.get(['moErrorRate'])!.value,
      moErrorCode: this.editForm.get(['moErrorCode'])!.value,
      dlrErrorRate: this.editForm.get(['dlrErrorRate'])!.value,
      dlrErrorCode: this.editForm.get(['dlrErrorCode'])!.value,
    };
  }
}
