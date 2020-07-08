import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss'],
})
export class EnvioComponent implements OnInit {

  @Input() tipo:string;

  constructor() { }

  ngOnInit() {}

}
