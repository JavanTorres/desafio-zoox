import { Component, OnInit } from '@angular/core';
import { Cidade, RequestCreateCidade } from '../cidade.model';
import { EstadoService } from 'src/app/estados/estado.service';
import { CidadeService } from '../cidade.service';
import { ResponseEstados, Estado } from 'src/app/estados/estado.model';

@Component({
  selector: 'app-create-cidades',
  templateUrl: './create-cidades.component.html',
  styleUrls: ['./create-cidades.component.css']
})
export class CreateCidadesComponent implements OnInit {
  cidade: Cidade;
  responseEstados: ResponseEstados;

  request: RequestCreateCidade = {
    nome: '',
    estadoId: '',
  };

  constructor(private cidadeService: CidadeService, private estadoService: EstadoService) { }

  ngOnInit() {
    this.estadoService.getEstados().subscribe(resEstados => {
      this.responseEstados = resEstados;
    });
  }

  save() {
    this.cidadeService.createCidade(this.request).subscribe(resCidade => this.cidade = resCidade);
  }


}
