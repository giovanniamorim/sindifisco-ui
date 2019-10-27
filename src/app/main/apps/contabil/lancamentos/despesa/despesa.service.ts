import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { SindiHttp } from 'app/main/apps/seguranca/sindi-http';

import 'rxjs/add/operator/catch';

@Injectable()
export class DespesaService implements Resolve<any> {
    
    despesasUrl: string;
    routeParams: any;
    despesa: any;
    onDespesaChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param { SindiHttp } _http
     */
    constructor(
        private _http: SindiHttp,
    )
    {
        // Set the defaults
        this.onDespesaChanged = new BehaviorSubject({});
        this.despesasUrl = `${this.despesasUrl}/lancamentos/despesas`;
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getDespesa()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get despesa
     *
     * @returns {Promise<any>}
     */
    getDespesa(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'nova' )
            {
                this.onDespesaChanged.next(false);
                resolve(false);
            }
            else
            {
                this._http.get(`${this.despesasUrl}/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.despesa = response;
                        this.onDespesaChanged.next(this.despesa);
                        resolve(response);
                    }, reject);
            }
        });
    }

    

    /**
     * POST despesa
     *
     * @param despesa
     * @returns {Promise<any>}
     */
    postDespesa(despesa): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._http.post(`${this.despesasUrl}`, despesa)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    /**
     * PUT despesa
     *
     * @param despesa
     * @returns {Promise<any>}
     */
    putDespesa(despesa): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.put(`${this.despesasUrl}/${despesa.id}`, despesa)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

}
