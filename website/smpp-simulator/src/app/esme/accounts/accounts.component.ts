import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  rows: any[] = []
  constructor(
    private httpClient: HttpClient,
    private alertService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(): void {
    this.httpClient.get<any[]>('api/esme-accounts').subscribe(res => this.rows = res, err => this.alertService.error(err.message));
  }

}
