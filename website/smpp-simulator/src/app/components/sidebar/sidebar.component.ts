import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  smscMenuItems: any[] = [
    { title: 'SMSC Instances', path: '/smsc/smsc-instance', icon: 'server' },
    { title: 'SMSC Accounts', path: '/smsc/smsc-account', icon: 'unlock' },
    { title: 'SMSC Sessions', path: '/smsc/smsc-session', icon: 'th-list' },
  ];

  esmeMenuItems: any[] = [
    { title: 'ESME Accounts', path: '/esme/esme-account', icon: 'id-card' },
    { title: 'ESME Sessions', path: '/esme/esme-session', icon: 'th-list' },
  ];

  smppMenuItems: any[] = [
    { title: 'SMPP Preset',   path: '/smpp/base-sm', icon: 'asterisk' },
    { title: 'MSISDN List', path: '/smpp/isdn-list', icon: 'th-list' },
    { title: 'Throughput Series', path: '/smpp/throughput-series', icon: 'asterisk' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
