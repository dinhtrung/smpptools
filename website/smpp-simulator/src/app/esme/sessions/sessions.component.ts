import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription, forkJoin, of, empty } from 'rxjs';
import { filter, map, catchError, tap } from 'rxjs/operators';
import { createRequestOption } from 'app/shared/util/request-util';
import { SERVER_API_URL } from 'env/environment';
import { ToastrService } from 'ngx-toastr';
// + search
import * as _ from 'lodash';
import * as jsyaml from 'js-yaml';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// + Modal
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, OnDestroy {
  @ViewChild('detailModal', { static: true }) detailModal: NgbModalRef;
  _ = _;
  stats: any;
  // + notification
  error: any;
  success: any;
  statusMsg: string;
  // + webserivce
  apiEndpoint: string;
  reloadEndpoint: string;
  restartEndpoint: string;
  wsEndpoint: string;
  wsTopic: string;
  wsSocket: WebSocketSubject<any>;
  // + data
  sessions: string[];
  sessionsByInstance: any = {};
  session: any;
  interval: any;
  // filter
  systemID = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private alertService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ type }) => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      // Subscribe for update
      this.httpClient
        .get(`/assets/esme/sessions.yaml`, {
          params: createRequestOption({ ts: new Date().getTime() }),
          observe: 'response',
          responseType: 'text'
        })
        .pipe(map(res => jsyaml.load(res.body)))
        .subscribe(res => this.initialize(res), err => console.error(err));
    });
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  trackId(index: number, item: any) {
    return item.sessionID;
  }

  protected onError(errorMessage: string) {
    this.alertService.error(errorMessage, null, null);
  }
  // Subscribe for web sockets if possible
  initialize(data) {
    this.sessionsByInstance = {};
    this.apiEndpoint = _.get(data, 'apiEndpoint', `/services/smpp-sessions`);
    this.reloadEndpoint = _.get(data, 'reloadEndpoint', `/services/smpp-sessions`);
    this.restartEndpoint = _.get(data, 'restartEndpoint', `/services/smpp-sessions`);
    // this.refreshState();
    // this.interval = setInterval(() => this.refreshState(), 10000);
    this.wsEndpoint = 'ws://' + window.location.host + _.get(data, 'wsEndpoint', '/ws');
    this.wsTopic = data.wsTopic || `smpp-sessions`;
    this.wsSocket = webSocket(this.wsEndpoint);
    this.wsSocket.subscribe(
      activity => this.parseMsg(activity), // Called whenever there is a message from the server.
      err => console.error('Cannot parseMsg ' + this.wsTopic, err), // Called if at any point WebSocket API signals some kind of error.
      () => this.alertService.error('Cannot connect to monitor websocket') // Called when connection is closed (for whatever reason).
    );
  }
  // Retrieve initial states
  refreshState() {
    // Retrieve current message
    // this.httpClient.get(this.apiEndpoint).subscribe(data => _.set(this.sessionsByInstance, dataOrigin, _.sortBy(_.values(JSON.parse(data.Cookie)), 'systemId')););
  }
  parseMsg(data: any): void {
    if (data.Via === this.wsTopic && data.Accept !== 'DELETE') {
      _.set(
        this.sessionsByInstance,
        data.Origin,
        _.sortBy(_.filter(_.values(JSON.parse(data.Cookie)), r => !this.systemID || r.systemId.startsWith(this.systemID)), 'systemId')
      );
    } else if (data.Accept === 'DELETE') {
      _.set(
        this.sessionsByInstance,
        data.Origin,
        _.remove(_.get(this.sessionsByInstance, data.Origin), function(n) {
          return n.systemId != data.Cookie;
        })
      );
    }
  }
  // stop a SMPP session
  stopSession(id) {
    this.httpClient.delete(SERVER_API_URL + `${this.apiEndpoint}/${id}`)
      .subscribe(
        res => (this.refreshState(), this.alertService.info('session stopped')),
        err => this.alertService.error(err.message)
      );
  }
  reloadAll() {
    this.httpClient
      .get(this.reloadEndpoint)
      .subscribe(res => (this.refreshState(), this.alertService.info('session reload')), err => this.alertService.error(err.message));
  }
  restartAll() {
    this.httpClient
      .post(this.restartEndpoint, {})
      .subscribe(res => (this.refreshState(), this.alertService.info('session reload')), err => this.alertService.error(err.message));
  }

  reset() {
    this.systemID = '';
  }
  viewDetail(sessionInfo) {
    this.session = sessionInfo;
    this.modalService
      .open(this.detailModal, { size: 'lg' })
      .result.then(result => this.modalService.dismissAll(), reason => this.modalService.dismissAll());
  }
}
