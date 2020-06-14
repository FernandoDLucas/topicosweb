import { ListaEstudantesComponent } from './estudantes/lista-estudantes.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SexoPipe } from './compartilhado/sexo.pipe';
import { AlturaComponent } from './compartilhado/altura.component';
import { EstudanteDetalheComponent } from './estudantes/estudante-detalhe.component';
import { BemVindoComponent } from './home/bemVindo.component';
import { RouterModule } from '@angular/router';
import { EditarEstudanteComponent } from './estudantes/editar-estudante/editar-estudante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ListaEstudantesComponent,
    SexoPipe,
    AlturaComponent,
    EstudanteDetalheComponent,
    BemVindoComponent,
    EditarEstudanteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'estudantes', component: ListaEstudantesComponent },
      { path: 'estudantes/:id', component: EstudanteDetalheComponent },
      { path: 'estudante/:id/editar', component: EditarEstudanteComponent },
      { path: 'bemvindo', component: BemVindoComponent },
      { path: '', redirectTo: 'bemvindo', pathMatch: 'full' },
      { path: '**', redirectTo: 'bemvindo', pathMatch: 'full' }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
