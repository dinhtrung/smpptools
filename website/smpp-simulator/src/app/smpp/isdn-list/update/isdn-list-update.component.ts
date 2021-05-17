import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IIsdnList, IsdnList } from '../isdn-list.model';
import { IsdnListService } from '../service/isdn-list.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-isdn-list-update',
  templateUrl: './isdn-list-update.component.html',
})
export class IsdnListUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(80)]],
    description: [],
    content: [],
  });

  constructor(
    protected isdnListService: IsdnListService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ isdnList }) => {
      this.updateForm(isdnList);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const isdnList = this.createFromForm();
    if (isdnList.id !== undefined) {
      this.subscribeToSaveResponse(this.isdnListService.update(isdnList));
    } else {
      this.subscribeToSaveResponse(this.isdnListService.create(isdnList));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIsdnList>>): void {
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

  protected updateForm(isdnList: IIsdnList): void {
    this.editForm.patchValue({
      id: isdnList.id,
      name: isdnList.name,
      description: isdnList.description,
      content: isdnList.content,
    });
  }

  protected createFromForm(): IIsdnList {
    return {
      ...new IsdnList(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      content: this.editForm.get(['content'])!.value,
    };
  }
}
