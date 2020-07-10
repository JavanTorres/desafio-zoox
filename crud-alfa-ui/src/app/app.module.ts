import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstadosComponent } from './estados/estados.component';
import { CidadesComponent } from './cidades/cidades.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateEstadosComponent } from './estados/create-estados/create-estados.component';
import { FormsModule } from '@angular/forms';
import { UpdateEstadosComponent } from './estados/update-estados/update-estados.component';
import { DeleteEstadosComponent } from './estados/delete-estados/delete-estados.component';
import { CreateCidadesComponent } from './cidades/create-cidades/create-cidades.component';
import { UpdateCidadesComponent } from './cidades/update-cidades/update-cidades.component';
import { DeleteCidadesComponent } from './cidades/delete-cidades/delete-cidades.component';

@NgModule({
  declarations: [
    AppComponent,
    EstadosComponent,
    CidadesComponent,
    CreateEstadosComponent,
    UpdateEstadosComponent,
    DeleteEstadosComponent,
    CreateCidadesComponent,
    UpdateCidadesComponent,
    DeleteCidadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
