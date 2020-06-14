import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoDetalheGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>  {
      let id = +next.url[1].path;
      if (!isNaN(id)) {
        alert("ID do Aluno inválido!");
        this.router.navigate(['/Alunos']);
        return false;
      }

    return true;
  }
  
}