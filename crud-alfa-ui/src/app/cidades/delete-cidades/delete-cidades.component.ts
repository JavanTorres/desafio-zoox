import { Component, OnInit } from '@angular/core';
import { Cidade } from '../cidade.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CidadeService } from '../cidade.service';

@Component({
  selector: 'app-delete-cidades',
  templateUrl: './delete-cidades.component.html',
  styleUrls: ['./delete-cidades.component.css']
})
export class DeleteCidadesComponent implements OnInit {
  _id: string;
  cidade: Cidade;

  constructor(private cidadeService: CidadeService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id');
    this.cidadeService.getCidade(this._id).subscribe(res => {
      this.cidade = res;
    });
  }

  delete() {
    this.cidadeService.deleteCidade(this._id).subscribe(res => {
      alert(`Cidade '${this.cidade.nome}' deletada com sucesso.`);
      this._router.navigate(['/cidades']);
    });
  }

  back() {
    this._router.navigate(['/cidades']);
  }

}
