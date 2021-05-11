import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  // modal reference
  @ViewChild('deleteModal', { static: true }) deleteModal: any;
  @ViewChild('editModal', { static: true }) editModal: any;
  isSaving = false;

  fields: FormlyFieldConfig[] = [];
  editForm = new FormGroup({});
  options: any = { formState: { } };
  model: any = {};
  // list of ESME accounts
  rows: any[] = [];
  config: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private alertService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadAll();
    this.loadForm();
  }

  loadForm(): void {
    this.activatedRoute.data.subscribe(({ config }) => this.config = config);
  }

  loadAll(): void {
    this.httpClient.get<any[]>('api/esme-accounts').subscribe(res => this.rows = res, err => this.alertService.error(err.message));
  }

  create(): void {
    this.modalService.open(this.editModal, { size: 'lg' }).result.then(
      () => this.httpClient.post('api/esme-accounts', this.model).subscribe(
          () => this.loadAll(),
          err => this.onError(err.error.title)
        ),
      () => this.modalService.dismissAll()
    );
  }

  update(model: any): void {
    this.modalService.open(this.editModal, { size: 'lg' }).result.then(
      () => this.httpClient.put('api/esme-accounts', this.model).subscribe(
          () => this.loadAll(),
          err => this.onError(err.error.title)
        ),
      () => this.modalService.dismissAll()
    );
  }

  // delete one account
  delete(id: string): void {
    this.modalService.open(this.deleteModal).result.then(
      () => this.httpClient.delete('api/esme-accounts/' + id).subscribe(
          () => this.loadAll(),
          err => this.onError(err.error.title)
        ),
      () => this.modalService.dismissAll()
    );
  }

  private onError(msg: string): void {
      this.alertService.error(msg);
  }
}
