import { Component, OnInit } from '@angular/core';
import { CidadeService } from './cidade.service';
import { EstadoService } from '../estados/estado.service';
import { ResponseCidades } from './cidade.model';
import { ResponseEstados } from '../estados/estado.model';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadesComponent implements OnInit {
  responseCidades: ResponseCidades;
  responseEstados: ResponseEstados;

  constructor(private estadoService: EstadoService, private cidadeService: CidadeService) { }

  ngOnInit() {
    this.estadoService.getEstados().subscribe(resEstados => {
      this.responseEstados = resEstados;

      this.cidadeService.getCidades().subscribe(resCidades => {
        this.responseCidades = resCidades;

        this.responseCidades.cidades.map((cidade, i) => {
          const est = this.responseEstados.estados.find(estado => {
            return estado._id === cidade.estadoId;
          });
          this.responseCidades.cidades[i].nomeEstado = est.nome;
        });
      });

    });

  }

}
