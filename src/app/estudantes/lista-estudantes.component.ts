import { Component, OnInit } from '@angular/core';
import { IEstudante } from './estudantes';
import { EstudantesService } from './estudantes.service';

@Component({
    selector: 'jedi-estudantes',
    templateUrl: './lista-estudantes.component.html'
})
export class ListaEstudantesComponent implements OnInit {

    tituloPagina: string = 'Lista de Estudantes';
    larguraImagem: number = 50;
    margemImagem: number = 2;
    exibirImagem: boolean = false;
    _filtroLista: string;
    get filtroLista(): string {
        return this._filtroLista;
    }
    set filtroLista(valor: string) {
        this._filtroLista = valor;
        this.estudantesFiltrados = this.filtroLista ? this.executarFiltro(this.filtroLista) : this.estudantes;
    }
    estudantesFiltrados: IEstudante[];

    alturaMaxima: number;
    alturasEstudantes: number[];

    estudantes: IEstudante[] = []

    mensagemErro: string;

    constructor(private estudantesServico: EstudantesService) {

    }
    ngOnInit(): void {
        this.getEstudantes();
    }

    getEstudantes(): void {
        this.estudantesServico.getEstudantes().subscribe(
            estudantes => {
                this.estudantes = estudantes;
                this.estudantesFiltrados = this.estudantes;
                // Cria um array contendo somente as alturas dos estudantes (number[])
                this.alturasEstudantes = this.estudantes.map(e => e.altura);
                // Obtém a maior altura do array criado na instrução anterior
                this.alturaMaxima = Math.max(...this.alturasEstudantes);
            },
            error => this.mensagemErro = <any>error
        );
    }
    alternarImagem(): void {
        this.exibirImagem = !this.exibirImagem;
    }

    executarFiltro(filtrarPor: string): IEstudante[] {
        filtrarPor = filtrarPor.toLocaleLowerCase();
        return this.estudantes.filter((estudante: IEstudante) =>
            estudante.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
    }

}
