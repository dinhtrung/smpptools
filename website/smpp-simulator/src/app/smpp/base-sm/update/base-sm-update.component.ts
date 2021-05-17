import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IBaseSm, BaseSm } from '../base-sm.model';
import { BaseSmService } from '../service/base-sm.service';
import { SMPP_TON, SMPP_NPI } from 'app/config/smpp-error-codes.constants';

@Component({
  selector: 'jhi-base-sm-update',
  templateUrl: './base-sm-update.component.html',
})
export class BaseSmUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    serviceType: [],
    sourceTON: [],
    sourceNPI: [],
    sourceAddr: [],
    destinationTON: [],
    destinationNPI: [],
    destinationAddr: [],
    esmClass: [],
    protocolID: [],
    priorityFlag: [],
    scheduleDeliveryTime: [],
    validityPeriod: [],
    registeredDelivery: [],
    replaceIfPresentFlag: [],
    dataCoding: [],
    defaultMessageID: [],
    text: [],
    udhParts: [],
    txtParts: [],
    tlvList: [],
  });

  smppTON = SMPP_TON;
  smppNPI = SMPP_NPI;

  constructor(protected baseSmService: BaseSmService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ baseSm }) => {
      this.updateForm(baseSm);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const baseSm = this.createFromForm();
    if (baseSm.id) {
      this.subscribeToSaveResponse(this.baseSmService.update(baseSm));
    } else {
      delete baseSm.id;
      this.subscribeToSaveResponse(this.baseSmService.create(baseSm));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBaseSm>>): void {
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

  protected updateForm(baseSm: IBaseSm): void {
    this.editForm.patchValue({
      id: baseSm.id,
      name: baseSm.name,
      description: baseSm.description,
      serviceType: baseSm.serviceType,
      sourceTON: baseSm.sourceTON,
      sourceNPI: baseSm.sourceNPI,
      sourceAddr: baseSm.sourceAddr,
      destinationTON: baseSm.destinationTON,
      destinationNPI: baseSm.destinationNPI,
      destinationAddr: baseSm.destinationAddr,
      esmClass: baseSm.esmClass,
      protocolID: baseSm.protocolID,
      priorityFlag: baseSm.priorityFlag,
      scheduleDeliveryTime: baseSm.scheduleDeliveryTime,
      validityPeriod: baseSm.validityPeriod,
      registeredDelivery: baseSm.registeredDelivery,
      replaceIfPresentFlag: baseSm.replaceIfPresentFlag,
      dataCoding: baseSm.dataCoding,
      defaultMessageID: baseSm.defaultMessageID,
      text: baseSm.text,
      udhParts: baseSm.udhParts,
      txtParts: baseSm.txtParts,
      tlvList: baseSm.tlvList,
    });
  }

  protected createFromForm(): IBaseSm {
    return {
      ...new BaseSm(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      serviceType: this.editForm.get(['serviceType'])!.value,
      sourceTON: this.editForm.get(['sourceTON'])!.value,
      sourceNPI: this.editForm.get(['sourceNPI'])!.value,
      sourceAddr: this.editForm.get(['sourceAddr'])!.value,
      destinationTON: this.editForm.get(['destinationTON'])!.value,
      destinationNPI: this.editForm.get(['destinationNPI'])!.value,
      destinationAddr: this.editForm.get(['destinationAddr'])!.value,
      esmClass: this.editForm.get(['esmClass'])!.value,
      protocolID: this.editForm.get(['protocolID'])!.value,
      priorityFlag: this.editForm.get(['priorityFlag'])!.value,
      scheduleDeliveryTime: this.editForm.get(['scheduleDeliveryTime'])!.value,
      validityPeriod: this.editForm.get(['validityPeriod'])!.value,
      registeredDelivery: this.editForm.get(['registeredDelivery'])!.value,
      replaceIfPresentFlag: this.editForm.get(['replaceIfPresentFlag'])!.value,
      dataCoding: this.editForm.get(['dataCoding'])!.value,
      defaultMessageID: this.editForm.get(['defaultMessageID'])!.value,
      text: this.editForm.get(['text'])!.value,
      udhParts: this.editForm.get(['udhParts'])!.value,
      txtParts: this.editForm.get(['txtParts'])!.value,
      tlvList: this.editForm.get(['tlvList'])!.value,
    };
  }
}
