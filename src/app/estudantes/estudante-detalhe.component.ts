import { Component, OnInit } from '@angular/core';
import { IEstudante } from './estudantes';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudantesService } from './estudantes.service';

@Component({
  templateUrl: './estudante-detalhe.component.html',
  styleUrls: ['./estudante-detalhe.component.css']
})
export class EstudanteDetalheComponent implements OnInit {

  tituloPagina = 'Detalhe do Estudante';
  estudante: IEstudante | undefined;
  mensagemErro = "";

  constructor(private route: ActivatedRoute, 
    private router: Router, private estudanteService: EstudantesService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getEstudante(id);
    }
  }

  getEstudante(id: string) {
    this.estudanteService.getEstudante(id).subscribe(
      estudante => this.estudante = estudante,
      error => this.mensagemErro = <any>error
    );
  }

  onVoltar(): void {
    this.router.navigate(['/estudantes']);
  }

}
