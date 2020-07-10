import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../estado.model';

@Component({
  selector: 'app-delete-estados',
  templateUrl: './delete-estados.component.html',
  styleUrls: ['./delete-estados.component.css']
})
export class DeleteEstadosComponent implements OnInit {

  _id: string;
  estado: Estado;

  constructor(private estadoService: EstadoService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id');
    this.estadoService.getEstado(this._id).subscribe(res => {
      this.estado = res;
    });
  }

  delete() {
    this.estadoService.deleteEstado(this._id).subscribe(res => {
      alert(`Estado '${this.estado.nome}' deletado com sucesso.`);
      this._router.navigate(['/estados']);
    });
  }

  back() {
    this._router.navigate(['/estados']);
  }

}
