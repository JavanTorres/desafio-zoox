import { Component, OnInit } from '@angular/core';
import { RequestCreateEstado, Estado } from '../estado.model';
import { EstadoService } from '../estado.service';

@Component({
  selector: 'app-create-estados',
  templateUrl: './create-estados.component.html',
  styleUrls: ['./create-estados.component.css']
})
export class CreateEstadosComponent implements OnInit {
  estado: Estado;

  request: RequestCreateEstado = {
    nome: '',
    abreviacao: '',
  };

  constructor(private estadoService: EstadoService) { }

  ngOnInit() {
  }

  save() {
    this.estadoService.createUser(this.request).subscribe(res => this.estado = res);
  }

}
