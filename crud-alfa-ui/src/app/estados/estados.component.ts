import { Component, OnInit } from '@angular/core';
import { EstadoService } from './estado.service';
import { ResponseEstados } from './estado.model';


@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {
  responseEstados: ResponseEstados;

  constructor(private estadoService: EstadoService) {}

  ngOnInit() {
    this.estadoService.getEstados().subscribe(res => this.responseEstados = res
    );
  }

}
