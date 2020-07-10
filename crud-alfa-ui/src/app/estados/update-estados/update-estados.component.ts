import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../estado.model';

@Component({
  selector: 'app-update-estados',
  templateUrl: './update-estados.component.html',
  styleUrls: ['./update-estados.component.css']
})
export class UpdateEstadosComponent implements OnInit {
  _id: string;
  request: any = {
    nome: '',
    abreviacao: '',
  };

  constructor(private estadoService: EstadoService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id');
    this.estadoService.getEstado(this._id).subscribe(res => {
      this.request = {
        nome: res.nome,
        abreviacao: res.abreviacao,
      };
    });
  }

  update() {
    this.estadoService.updateEstado(this._id, this.request).subscribe(res => {
      alert(`Estado '${this.request.nome}' atualizado com sucesso.`);
      this._router.navigate(['/estados']);
    });
  }

}
