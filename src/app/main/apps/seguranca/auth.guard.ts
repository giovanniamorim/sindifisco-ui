import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._auth.isAccessTokenInvalido()) {
      console.log('Navegação com access token inválido. Obtendo novo token...');

      return this._auth.obterNovoAccessToken()
        .then(() => {
          if (this._auth.isAccessTokenInvalido()) {
            this._router.navigate(['/login']);
            return false;
          }

          return true;
        });
    } else if (next.data.roles && !this._auth.temQualquerPermissao(next.data.roles)) {
      this._router.navigate(['/']);
      return false;
    }

    return true;
  }
}
