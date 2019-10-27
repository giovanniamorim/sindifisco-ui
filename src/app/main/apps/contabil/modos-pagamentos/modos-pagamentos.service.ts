import { AuthService } from './../../seguranca/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SindiHttp } from '../../seguranca/sindi-http';
import { environment } from 'environments/environment';

@Injectable()
export class ModosPagamentosService implements Resolve<any>
{
    modosPagamentosUrl: string;
    modosPagamentos: any[];
    onModosPagamentosChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {SindiHttp} _http
     */
    constructor(
        private _http: SindiHttp,
        private _router: Router,
        private _auth: AuthService
    )
    {
        // Set the defaults
        this.onModosPagamentosChanged = new BehaviorSubject({});
        this.modosPagamentosUrl = `${environment.apiUrl}/modospagamentos`;
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getModosPagamentos()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get modosPagamentos
     *
     * @returns {Promise<any>}
     */
    getModosPagamentos(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._http.get(`${this.modosPagamentosUrl}`)
                .subscribe((response: any) => {
                    this.modosPagamentos = response;
                    this.onModosPagamentosChanged.next(this.modosPagamentos);
                    resolve(response);
                }, reject);
        });
    }

    deleteModoPagamento(id: number): any {
        return this._http.delete(`${this.modosPagamentosUrl}/${id}`).pipe(
          catchError(this.handleError)
        );
    }


    // tslint:disable-next-line:typedef
    private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

        // A client-side or network error occurred. Handle it accordingly.

        console.error('Ocorreu um erro:', error.error.message);
    } else {

        // The backend returned an unsuccessful response code.

        // The response body may contain clues as to what went wrong.

        console.error(`Backend retournou o código ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    return throwError('Opss! Aconteceu algum erro.');
    }
}
