import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDataFile, DataFile } from '../data-file.model';
import { DataFileService } from '../service/data-file.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-data-file-update',
  templateUrl: './data-file-update.component.html',
})
export class DataFileUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    fileID: [],
    fileIDContentType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected dataFileService: DataFileService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dataFile }) => {
      this.updateForm(dataFile);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('smpptoolsApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dataFile = this.createFromForm();
    if (dataFile.id !== undefined) {
      this.subscribeToSaveResponse(this.dataFileService.update(dataFile));
    } else {
      this.subscribeToSaveResponse(this.dataFileService.create(dataFile));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDataFile>>): void {
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

  protected updateForm(dataFile: IDataFile): void {
    this.editForm.patchValue({
      id: dataFile.id,
      name: dataFile.name,
      description: dataFile.description,
      fileID: dataFile.fileID,
      fileIDContentType: dataFile.fileIDContentType,
    });
  }

  protected createFromForm(): IDataFile {
    return {
      ...new DataFile(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      fileIDContentType: this.editForm.get(['fileIDContentType'])!.value,
      fileID: this.editForm.get(['fileID'])!.value,
    };
  }
}
