import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../cidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from 'src/app/estados/estado.service';
import { ResponseEstados } from 'src/app/estados/estado.model';

@Component({
  selector: 'app-update-cidades',
  templateUrl: './update-cidades.component.html',
  styleUrls: ['./update-cidades.component.css']
})
export class UpdateCidadesComponent implements OnInit {
  _id: string;
  request: any = {
    nome: '',
    estadoId: '',
  };
  responseEstados: ResponseEstados;

  constructor(private cidadeService: CidadeService, private estadoService: EstadoService, private route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.estadoService.getEstados().subscribe(resEstados => {
      this.responseEstados = resEstados;

      this._id = this.route.snapshot.paramMap.get('_id');

      this.cidadeService.getCidade(this._id).subscribe(res => {
        this.request = {
          nome: res.nome,
          estadoId: res.estadoId,
        };
      });
    });

  }

  update() {
    this.cidadeService.updateCidade(this._id, this.request).subscribe(res => {
      alert(`Ciadade '${this.request.nome}' atualizada com sucesso.`);
      this._router.navigate(['/cidades']);
    });
  }

}
