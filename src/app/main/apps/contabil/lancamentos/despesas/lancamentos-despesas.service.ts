import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { SindiHttp } from 'app/main/apps/seguranca/sindi-http';
import { environment } from 'environments/environment';


@Injectable()
export class LancamentosDespesasService implements Resolve<any>
{
    despesasUrl: string;
    novaDespesaUrl: string;
    despesas: any[];
    onDespesasChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {SindiHttp} _http
     */
    constructor(
        private _http: SindiHttp
    )
    {
        // Set the defaults
        this.onDespesasChanged = new BehaviorSubject({});
        this.despesasUrl = `${environment.apiUrl}/lancamentos/despesas`;
        this.novaDespesaUrl = `${environment.apiUrl}/lancamentos`;
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
                this.getDespesas()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get despesas
     *
     * @returns {Promise<any>}
     */
    getDespesas(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._http.get(`${this.despesasUrl}`)
                .subscribe((response: any) => {
                    this.despesas = response;
                    this.onDespesasChanged.next(this.despesas);
                    resolve(response);
                }, reject);
        });
    }

    deleteDespesa(id: number): any {
        return this._http.delete(`${this.despesasUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }


    private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
    }
}
