import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {


    oauthTokenUrl: string;
    jwtPayload: any;
    
    constructor(
        private _http: HttpClient,
        private _jwtHelper: JwtHelperService
        ) { 
        this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
        this.carregarToken();
      }

      login(usuario: string, senha: string): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    
        const body = `username=${usuario}&password=${senha}&grant_type=password`;
    
        return this._http.post<any>(this.oauthTokenUrl, body,
            { headers, withCredentials: true })
          .toPromise()
          .then(response => {
            this.armazenarToken(response.access_token);
          })
          .catch(response => {
            if (response.status === 400) {
              if (response.error === 'invalid_grant') {
                return Promise.reject('Usuário ou senha inválida!');
              }
            }
    
            return Promise.reject(response);
          });
      }
    
      obterNovoAccessToken(): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    
        const body = 'grant_type=refresh_token';
    
        return this._http.post<any>(this.oauthTokenUrl, body,
            { headers, withCredentials: true })
          .toPromise()
          .then(response => {
            this.armazenarToken(response.access_token);
    
            console.log('Novo access token criado!');
    
            return Promise.resolve(null);
          })
          .catch(response => {
            console.error('Erro ao renovar token.', response);
            return Promise.resolve(null);
          });
      }
    
      limparAccessToken(): any {
        localStorage.removeItem('token');
        this.jwtPayload = null;
      }
    
      isAccessTokenInvalido(): any
       {
        const token = localStorage.getItem('token');
    
        return !token || this._jwtHelper.isTokenExpired(token);
      }
    
      temPermissao(permissao: string): any {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
      }
    
      temQualquerPermissao(roles): any {
        for (const role of roles) {
          if (this.temPermissao(role)) {
            return true;
          }
        }
    
        return false;
      }
    
      private armazenarToken(token: string): any {
        this.jwtPayload = this._jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
      }
    
      private carregarToken(): any {
        const token = localStorage.getItem('token');
    
        if (token) {
          this.armazenarToken(token);
        }
      }

}
