import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITestSession, TestSession, PATTERN_VARIANTS } from '../test-session.model';
import { TestSessionService } from '../service/test-session.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
// + upload handle
import { IUploadFile } from '../../upload-file/upload-file.model'
// + Test SEtup
import { ITestSetup } from '../../test-setup/test-setup.model';
import { TestSetupService } from '../../test-setup/service/test-setup.service';

@Component({
  selector: 'jhi-test-session-update',
  templateUrl: './test-session-update.component.html',
})
export class TestSessionUpdateComponent implements OnInit {
  isSaving = false;
  testSetupRef: ITestSetup[] = [];
  patternVariants = PATTERN_VARIANTS;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    testSetup: [],
    trafficFile: [],
    trafficFileContentType: [],
    patternVariant: [],
    patternMin: [],
    patternMax: [],
  });

  constructor(
    protected httpClient: HttpClient,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected testSessionService: TestSessionService,
    protected testSetupService : TestSetupService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testSession }) => {
      this.updateForm(testSession);
      this.testSetupService.query().subscribe((res: HttpResponse<ITestSetup[]>) => this.testSetupRef = res.body ?? []);
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
  // setFileData upload file to S3 bucket and return the file info as reference
  patchFileData(event: Event, field: string): void {
    const formData = new FormData();
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      formData.append('file', file, file.name);
      this.httpClient.post('api/file-upload', formData, { observe: 'response' })
        .subscribe(
          (res: HttpResponse<IUploadFile>) => this.editForm.get(field)?.patchValue(res.body?.name),
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
    const testSession = this.createFromForm();
    if (testSession.id !== undefined) {
      this.subscribeToSaveResponse(this.testSessionService.update(testSession));
    } else {
      this.subscribeToSaveResponse(this.testSessionService.create(testSession));
    }
  }

  hideRange(): boolean {
    const variant = this.editForm.get(['patternVariant'])!.value;
    return (variant === undefined) || (variant === 'STRESS_TEST');
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
      patternMin: testSession.patternMin,
      patternMax: testSession.patternMax,
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
      patternMin: this.editForm.get(['patternMin'])!.value,
      patternMax: this.editForm.get(['patternMax'])!.value,
    };
  }
}
