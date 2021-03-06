import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Route } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import { SindiHttp } from '../../seguranca/sindi-http';
import { environment } from 'environments/environment.hmr';

@Injectable()
export class PlanoContaService implements Resolve<any> {

    planoContaUrl: string;
    routeParams: any;
    planoConta: any;
    onPlanoContaChanged: BehaviorSubject<any>;
    listaContasPai = [];

    /**
     * Constructor
     *
     * @param {SindiHttp} _http
     */
    constructor(
        private _http: SindiHttp,
    )
    {
        // Set the defaults
        this.onPlanoContaChanged = new BehaviorSubject({});
        this.planoContaUrl = `${environment}/modospagamentos`;
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
                this.getPlanoConta()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get PlanoConta
     *
     * @returns {Promise<any>}
     */
    getPlanoConta(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'novo' )
            {
                this.onPlanoContaChanged.next(false);
                resolve(false);
            }
            else
            {
                this._http.get(`${this.planoContaUrl}/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.planoConta = response;
                        this.onPlanoContaChanged.next(this.planoConta);
                        resolve(response);
                    }, reject);
            }
        });
    }

    

    /**
     * Add planoConta
     *
     * @param planoConta
     * @returns {Promise<any>}
     */
    postPlanoConta(planoConta): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(`${this.planoContaUrl}`, planoConta)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    /**
     * Save planoConta
     *
     * @param planoConta
     * @returns {Promise<any>}
     */
    updatePlanoConta(planoConta): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.put(`${this.planoContaUrl}/${planoConta.id}`, planoConta)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

}
