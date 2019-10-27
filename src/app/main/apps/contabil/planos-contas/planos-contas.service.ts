import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SindiHttp } from '../../seguranca/sindi-http';

@Injectable()
export class PlanosContasService implements Resolve<any> {
    
    planosContasUrl: string;
    planosContas: any[];
    onPlanosContasChanged: BehaviorSubject<any>;

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
        this.onPlanosContasChanged = new BehaviorSubject({});
        this.planosContasUrl = `${environment.apiUrl}/planoscontas`;
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
                this.getPlanosContas()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get planosContas
     *
     * @returns {Promise<any>}
     */
    getPlanosContas(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._http.get(`${this.planosContasUrl}`)
                .subscribe((response: any) => {
                    this.planosContas = response;
                    this.onPlanosContasChanged.next(this.planosContas);
                    resolve(response);
                }, reject);
        });
    }

    // tslint:disable-next-line:typedef
    deletePlanoConta(id: number) 
    {
        return this._http.delete(`${this.planosContasUrl}/${id}`).pipe(
          catchError(this.handleError)
        );
    }


    // tslint:disable-next-line:typedef
    private handleError(error: HttpErrorResponse) {
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
