import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals.class';
import * as _ from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  globals = Globals;
  constructor() { }

  ngOnInit() { }

  get user() {
    return Globals.token ? _.get(Globals.decodedToken, 'data') : null;
  }

}
