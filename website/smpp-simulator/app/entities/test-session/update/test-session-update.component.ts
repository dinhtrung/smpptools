import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITestSession, TestSession } from '../test-session.model';
import { TestSessionService } from '../service/test-session.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-test-session-update',
  templateUrl: './test-session-update.component.html',
})
export class TestSessionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    testSetup: [],
    trafficFile: [],
    trafficFileContentType: [],
    patternVariant: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected testSessionService: TestSessionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testSession }) => {
      this.updateForm(testSession);
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
    const testSession = this.createFromForm();
    if (testSession.id !== undefined) {
      this.subscribeToSaveResponse(this.testSessionService.update(testSession));
    } else {
      this.subscribeToSaveResponse(this.testSessionService.create(testSession));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITestSession>>): void {
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

  protected updateForm(testSession: ITestSession): void {
    this.editForm.patchValue({
      id: testSession.id,
      name: testSession.name,
      description: testSession.description,
      testSetup: testSession.testSetup,
      trafficFile: testSession.trafficFile,
      trafficFileContentType: testSession.trafficFileContentType,
      patternVariant: testSession.patternVariant,
    });
  }

  protected createFromForm(): ITestSession {
    return {
      ...new TestSession(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      testSetup: this.editForm.get(['testSetup'])!.value,
      trafficFileContentType: this.editForm.get(['trafficFileContentType'])!.value,
      trafficFile: this.editForm.get(['trafficFile'])!.value,
      patternVariant: this.editForm.get(['patternVariant'])!.value,
    };
  }
}
