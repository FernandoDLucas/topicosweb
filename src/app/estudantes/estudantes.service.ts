import { Injectable } from '@angular/core';
import { IEstudante } from './estudantes';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EstudantesService {

    private estudanteUrl = '//localhost:8080/estudantesapi/estudantes';

    constructor(private http: HttpClient) { }

    getEstudantes(): Observable<IEstudante[]> {
        return this.http.get<IEstudante[]>(this.estudanteUrl + '/todos').pipe(
            tap(dados => console.log('Todos: ' + JSON.stringify(dados))),
            catchError(this.trataErro)
        );
    }

    getEstudante(id: string): Observable<IEstudante> {
        const url = `${this.estudanteUrl}/${id}`;
        return this.http.get<IEstudante>(url).pipe(
            tap(data => console.log('getEstudante: ' + JSON.stringify(data))),
            catchError(this.trataErro)
        )
    }

    criarEstudante(estudante: IEstudante): Observable<IEstudante> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        estudante.id = null;
        return this.http.post<IEstudante>(this.estudanteUrl + "/novo", estudante, { headers })
          .pipe(
            tap(data => console.log('criarEstudante: ' + JSON.stringify(data))),
            catchError(this.trataErro)
          );
      }


      deletarEstudante(id: String): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.estudanteUrl}/${id}`;
        return this.http.delete<IEstudante>(url, { headers })
          .pipe(
            tap(data => console.log('deletarEstudante: ' + id)),
            catchError(this.trataErro)
          );
      }
    
      atualizarEstudante(estudante: IEstudante): Observable<IEstudante> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.estudanteUrl}/atualiza/${estudante.id}`;
        return this.http.put<IEstudante>(url, estudante, { headers })
          .pipe(
            tap(() => console.log('atualizarestudante: ' + estudante.id)),
            map(() => estudante),
            catchError(this.trataErro)
          );
      }

    private trataErro(erro: HttpErrorResponse) {
        // Em uma aplicação real, podemos enviar o erro para alguma infraestrutura
        // remota de log, ao invés de simplesmente enviar para o console
        let mensagemErro = '';
        if (erro.error instanceof ErrorEvent) {
            // Um erro no lado cliente ou de rede ocorreu. Tratar adequadamente
            mensagemErro = `Um erro ocorreu: ${erro.error.message}`;
        } else {
            // Back-end retornou um código de resposta de falha
            // O corpo da resposta pode conter dicas sobre o que deu errado
            mensagemErro = `Servidor retornou o código: ${erro.status}, a mensagem de erro é ${erro.message}`;
        }
        console.error(mensagemErro);
        return throwError(mensagemErro);
    }
}