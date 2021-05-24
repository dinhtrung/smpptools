import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUploadFile, UploadFile } from '../upload-file.model';
import { UploadFileService } from '../service/upload-file.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-upload-file-update',
  templateUrl: './upload-file-update.component.html',
})
export class UploadFileUpdateComponent implements OnInit {
  isSaving = false;
  uploadFile: IUploadFile | null = null;
  editForm = this.fb.group({
    id: [],
    file: [null, [Validators.required]],
    contentType: [],
  });

  constructor(
    private httpClient: HttpClient,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected uploadFileService: UploadFileService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uploadFile }) => {
      this.updateForm(uploadFile);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event): void {
    const formData = new FormData();
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      formData.append('file', file, file.name);
      this.httpClient.post('api/file-upload', formData, { observe: 'response' })
        .subscribe(
          (res: HttpResponse<IUploadFile>) => this.uploadFile = res.body,
          (err: Error) =>
          this.eventManager.broadcast(
            new EventWithContent<AlertError>('smpptoolsApp.error', { ...err, key: 'error.file.' + err.name })
          )
        );
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const uploadFile = this.createFromForm();
    if (uploadFile.id !== undefined) {
      this.subscribeToSaveResponse(this.uploadFileService.update(uploadFile));
    } else {
      this.subscribeToSaveResponse(this.uploadFileService.create(uploadFile));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUploadFile>>): void {
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

  protected updateForm(uploadFile: IUploadFile): void {
    this.editForm.patchValue({
      id: uploadFile.id,
      file: uploadFile.file,
      contentType: uploadFile.contentType,
    });
  }

  protected createFromForm(): IUploadFile {
    return {
      ...new UploadFile(),
      id: this.editForm.get(['id'])!.value,
      contentType: this.editForm.get(['contentType'])!.value,
      file: this.editForm.get(['file'])!.value,
    };
  }
}
