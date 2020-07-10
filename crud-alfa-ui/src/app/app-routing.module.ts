import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadosComponent } from './estados/estados.component';
import { CreateEstadosComponent } from './estados/create-estados/create-estados.component';
import { UpdateEstadosComponent } from './estados/update-estados/update-estados.component';
import { DeleteEstadosComponent } from './estados/delete-estados/delete-estados.component';
import { CidadesComponent } from './cidades/cidades.component';
import { CreateCidadesComponent } from './cidades/create-cidades/create-cidades.component';
import { UpdateCidadesComponent } from './cidades/update-cidades/update-cidades.component';
import { DeleteCidadesComponent } from './cidades/delete-cidades/delete-cidades.component';


const routes: Routes = [
  {path: 'estados', component: EstadosComponent},
  {path: 'estados/create', component: CreateEstadosComponent},
  {path: 'estados/update/:_id', component: UpdateEstadosComponent},
  {path: 'estados/delete/:_id', component: DeleteEstadosComponent},
  {path: 'cidades', component: CidadesComponent},
  {path: 'cidades/create', component: CreateCidadesComponent},
  {path: 'cidades/update/:_id', component: UpdateCidadesComponent},
  {path: 'cidades/delete/:_id', component: DeleteCidadesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
