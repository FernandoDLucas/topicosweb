import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, Validators, FormControlName, FormBuilder } from '@angular/forms';
import { IEstudante } from '../estudantes';
import { NumberValidators } from '../../compartilhado/number-validators';
import { Subscription, fromEvent, Observable, merge } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericValidator } from '../../compartilhado/generic-validator';
import { EstudantesService } from '../estudantes.service';
import { debounceTime } from 'rxjs/operators';



@Component({
  templateUrl: './editar-estudante.component.html',
})

export class EditarEstudanteComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  tituloPagina = 'Edição de Estudante';
  errorMessage: string;
  formEstudantes: FormGroup;

  estudante: IEstudante; 
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private rota: ActivatedRoute,
    private roteador: Router,
    private servicoEstudantes: EstudantesService) {
    this.validationMessages = {
      nome: {
        required: 'O nome do aluno é obrigatório.',
        minlength: 'O nome do produto precisa ter pelo menos três caracteres.',
        maxlength: 'O nome do produto não pode exceder 50 caracteres.'
      },
      anonascimento: {
        required: 'O ano de nascimento é obrigatório.',
        faixa: 'O ano de nascimento deve ser maior que 1900 e menor que 2020.'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }


  ngOnInit(): void {
    this.formEstudantes = this.fb.group({
      nome: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      anoNascimento: ['', Validators.required,],
      dataLancamento: '',
      rating: ['', NumberValidators.faixa(1900, 2020)],
      descricao: ''
    });
    this.sub = this.rota.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getEstudante(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
     const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    
     merge(this.formEstudantes.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.formEstudantes);
    });
  }

  getEstudante(id: string): void {
    this.servicoEstudantes.getEstudante(id)
      .subscribe({
        next: (estudante: IEstudante) => this.exibeEstudantes(estudante),
        error: err => this.errorMessage = err
      });
  }

  exibeEstudantes(estudante: IEstudante): void {
    if (this.formEstudantes) {
      this.formEstudantes.reset();
    }
    this.estudante = estudante;

    if (this.estudante.id === "0") {
      this.tituloPagina = 'Adicionar Produto';
    } else {
      this.tituloPagina = `Editar Produto: ${this.estudante.nome}`;
    }
    this.formEstudantes.patchValue({
      nome: this.estudante.nome,
      peso: this.estudante.peso,
      altura: this.estudante.altura,
      corCabelo: this.estudante.corCabelo,
      corOlhos: this.estudante.corOlhos,
      anoNascimento: this.estudante.anoNascimento,
      sexo: this.estudante.sexo,
      planeta: this.estudante.planeta,
      url: this.estudante.url,
    });
  }

  salvarEstudante(): void {
    if (this.formEstudantes.valid) {
      if (this.formEstudantes.dirty) {
        const p = { ...this.estudante, ...this.formEstudantes.value };
        if (p.id === 0) {
          this.servicoEstudantes.criarEstudante(p)
            .subscribe({
              next: () => {
                alert("Estudante criado. Clique para voltar à lista")
                this.onSaveComplete()
              },
              error: err => this.errorMessage = err
            });
        } else {
          this.servicoEstudantes.atualizarEstudante(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Por favor corrija os erros de validação.';
    }
  }


  deletarEstudante(): void {
    if (this.estudante.id === "0") {
      // Não remove, pois nunca foi salvo
      this.onSaveComplete();
    } else {
      if (confirm(`Remover o estudante: ${this.estudante.nome}?`)) {
        this.servicoEstudantes.deletarEstudante(this.estudante.id)
          .subscribe({
            next: () => {
              alert("Estudante removido. Clique para voltar à lista");
              this.onSaveComplete()
            },            error: err => this.errorMessage = err
          });
      }
    }
  }

  onSaveComplete(): void {
    this.formEstudantes.reset();
    this.roteador.navigate(['/produtos']);
}


}
