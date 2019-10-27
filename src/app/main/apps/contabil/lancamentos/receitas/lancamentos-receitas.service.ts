import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { SindiHttp } from 'app/main/apps/seguranca/sindi-http';

@Injectable()
export class LancamentosReceitasService implements Resolve<any> {
    
    receitasUrl: string;
    receitas: any[];
    onReceitasChanged: BehaviorSubject<any>;

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
        this.onReceitasChanged = new BehaviorSubject({});
        this.receitasUrl = `${environment.apiUrl}/lancamentos/receitas`;
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
                this.getReceitas()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get receitas
     *
     * @returns {Promise<any>}
     */
    getReceitas(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._http.get(`${this.receitasUrl}`)
                .subscribe((response: any) => {
                    this.receitas = response;
                    this.onReceitasChanged.next(this.receitas);
                    resolve(response);
                }, reject);
        });
    }

    deleteReceita(id: number): any {
        return this._http.delete(`${this.receitasUrl}/${id}`).pipe(
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
