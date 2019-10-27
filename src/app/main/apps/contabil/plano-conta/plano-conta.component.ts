import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { PlanoConta, TipoProfundidade, TipoLancamento, ContaPai } from './plano-conta.model';
import { PlanoContaService } from './plano-conta.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'plano-conta',
  templateUrl: './plano-conta.component.html',
  styleUrls: ['./plano-conta.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class PlanoContaComponent implements OnInit, OnDestroy
{
    planoConta: PlanoConta;
    pageType: string;
    planoContaForm: FormGroup;

    valorSelecao: string;

    profundidades: TipoProfundidade [] = [
        { valor: 'ANALÍTICA', descricao: 'ANALÍTICA' },
        { valor: 'SINTÉTICA', descricao: 'SINTÉTICA' }
    ];

    tiposLancamentos: TipoLancamento [] = [
        { valor: 'RECEITA', descricao: 'RECEITA' },
        { valor: 'DESPESA', descricao: 'DESPESA' }
    ];

    contasPais: ContaPai [] = [
        { id: 4,  descricao: '3.1.1.01.0001 - Associados Ativos' },
        { id: 6,  descricao: '3.1.1.01.0002 - Associados Aposentados' },
        { id: 7,  descricao: '3.1.1.01.0004 - Associados Pensionistas' },
        { id: 11, descricao: '3.2.1.01.0001 - Fundo de Aplicação em Curto Prazo' },
        { id: 12, descricao: '3.2.1.01.0002 - Outras Receitas - Superavit' },
        { id: 16, descricao: '3.3.1.01.0001 - Ressarcimentos e Diárias' },
        { id: 17, descricao: '3.3.1.01.0002 - Outras Receitas' },
        
    ];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {PlanoConta} _planoContaService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _planoContaService: PlanoContaService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
        // Set the default
        this.planoConta = new PlanoConta();

        // Set the private defaults
        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update planoConta on changes
        this._planoContaService.onPlanoContaChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(planoConta => {
                if ( planoConta ){
                    this.planoConta = new PlanoConta(planoConta);
                    this.pageType = 'editar';
                } else {
                    this.pageType = 'novo';
                    this.planoConta = new PlanoConta();
                }
                this.planoContaForm = this.createPlanoContaForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Create planoConta form
     *
     * @returns {FormGroup}
     */
    createPlanoContaForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.planoConta.id],
            codigo          : [this.planoConta.codigo],
            descricao       : [this.planoConta.descricao],
            contaPai        : [this.planoConta.contasPais],
            profundidade    : [this.planoConta.profundidades],
            tipoLancamento  : [this.planoConta.tiposLancamentos],
            ano             : [this.planoConta.ano]
        });
    }
    

    /**
     * Salvar planoConta
     */
    salvarPlanoConta(): void {
        const data = this.planoContaForm.getRawValue();
        this._planoContaService.postPlanoConta(data)
            .then(() => {
                this._planoContaService.onPlanoContaChanged.next(data);
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Plano de conta salvo com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
            });
    }
    

    /**
     * Novo planoConta
     */
    novoPlanoConta(): void
    {
        const data = this.planoContaForm.getRawValue();
        this._planoContaService.postPlanoConta(data)
            .then(() => {
                this._planoContaService.onPlanoContaChanged.next(data);
                // Mostra mensagem de sucesso
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Plano de conta adicionado com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
                this._router.navigate(['/apps/contabil/planos-contas']);
            });
    }
    

    // MOCK LISTA CONTAS PAI
    // listarContasPais(): any {
    //     return [
    //         { id: '1', 
    //           codigo: '3',  
    //           descricao: 'Receitas Correntes',
    //           contasFilhas: [
    //                 {
    //                     id: '2', 
    //                     codigo: '3.1',  
    //                     descricao: 'Receitas Gerais',
    //                     contasFilhas: [
    //                         {
    //                             id: '3', 
    //                             codigo: '3.1.1',  
    //                             descricao: 'Receitas Ordinárias da Atividade',
    //                             contasFilhas: [
    //                                 {
    //                                     id: '4', 
    //                                     codigo: '3.1.1.01',  
    //                                     descricao: 'Contribuições de Associados',
    //                                     contasFilhas: [
    //                                         {
    //                                             id: '5', 
    //                                             codigo: '3.1.1.01.0001',  
    //                                             descricao: 'Associados Ativos',
    //                                             contasFilhas: [],
    //                                             profundidade: 'ANALÍTICA',
    //                                             tipoLancamento: 'RECEITA',
    //                                             ano: '2016'
    //                                         },
    //                                         {
    //                                             id: '6', 
    //                                             codigo: '3.1.1.01.0002',  
    //                                             descricao: 'Associados Aposentados',
    //                                             contasFilhas: [],
    //                                             profundidade: 'ANALÍTICA',
    //                                             tipoLancamento: 'RECEITA',
    //                                             ano: '2016'
    //                                         },
    //                                         {
    //                                             id: '7', 
    //                                             codigo: '3.1.1.01.0004',  
    //                                             descricao: 'Associados Pensionistas',
    //                                             contasFilhas: [],
    //                                             profundidade: 'ANALÍTICA',
    //                                             tipoLancamento: 'RECEITA',
    //                                             ano: '2016'
    //                                         },
    //                                     ],
    //                                     profundidade: 'SINTÉTICA',
    //                                     tipoLancamento: 'RECEITA',
    //                                     ano: '2016'
    //                                 },
    //                             ],
    //                             profundidade: 'SINTÉTICA',
    //                             tipoLancamento: 'RECEITA',
    //                             ano: '2016'
    //                         },
    //                     ],
    //                     profundidade: 'SINTÉTICA',
    //                     tipoLancamento: 'RECEITA',
    //                     ano: '2016'
    //                 },
    //                 {
    //                     id: '8', 
    //                     codigo: '3.2',  
    //                     descricao: 'Receitas Patrimôniais',
    //                     contasFilhas: [
    //                         {
    //                             id: '9', 
    //                             codigo: '3.2.1',  
    //                             descricao: 'Receita Patrimônial',
    //                             contasFilhas: [
    //                                 {
    //                                     id: '10', 
    //                                     codigo: '3.2.1.01',  
    //                                     descricao: 'Receitas de Valores Imobiliários',
    //                                     contasFilhas: [
    //                                         {
    //                                             id: '11', 
    //                                             codigo: '3.2.1.01.0001',  
    //                                             descricao: 'Fundo de Aplicação em Curto Prazo',
    //                                             contasFilhas: [],
    //                                             profundidade: 'ANALÍTICA',
    //                                             tipoLancamento: 'RECEITA',
    //                                             ano: '2016'
    //                                         },
    //                                         {
    //                                             id: '12', 
    //                                             codigo: '3.2.1.01.0002',  
    //                                             descricao: 'Outras Receitas - Superavit',
    //                                             contasFilhas: [],
    //                                             profundidade: 'ANALÍTICA',
    //                                             tipoLancamento: 'RECEITA',
    //                                             ano: '2016'
    //                                         },
    //                                     ],
    //                                     profundidade: 'SINTÉTICA',
    //                                     tipoLancamento: 'RECEITA',
    //                                     ano: '2016'
    //                                 },
    //                             ],
    //                             profundidade: 'SINTÉTICA',
    //                             tipoLancamento: 'RECEITA',
    //                             ano: '2016'
    //                         },
    //                     ],
    //                     profundidade: 'SINTÉTICA',
    //                     tipoLancamento: 'RECEITA',
    //                     ano: '2016'
    //                 },
    //                 {
    //                     id: '13', 
    //                     codigo: '3.3',  
    //                     descricao: 'Outras Receitas',
    //                     contasFilhas: [
    //                         {
    //                             id: '14', 
    //                             codigo: '3.3.1',  
    //                             descricao: 'Outras Receitas Correntes',
    //                             contasFilhas: [
    //                                 {
    //                                     id: '15', 
    //                                     codigo: '3.3.1.01',  
    //                                     descricao: 'Outras Receitas Correntes Gerais',
    //                                     contasFilhas: [
    //                                         {
    //                                             id: '16', 
    //                                             codigo: '3.3.1.01.0001',  
    //                                             descricao: 'Ressarcimentos e Diárias',
    //                                             contasFilhas: [],
    //                                             profundidade: 'ANALÍTICA',
    //                                             tipoLancamento: 'RECEITA',
    //                                             ano: '2016'
    //                                         },
    //                                         {
    //                                             id: '17', 
    //                                             codigo: '3.3.1.01.0002',  
    //                                             descricao: 'Outras Receitas',
    //                                             contasFilhas: [],
    //                                             profundidade: 'ANALÍTICA',
    //                                             tipoLancamento: 'RECEITA',
    //                                             ano: '2016'
    //                                         },
    //                                     ],
    //                                     profundidade: 'SINTÉTICA',
    //                                     tipoLancamento: 'RECEITA',
    //                                     ano: '2016'
    //                                 },
    //                             ],
    //                             profundidade: 'SINTÉTICA',
    //                             tipoLancamento: 'RECEITA',
    //                             ano: '2016'
    //                         },
    //                     ],
    //                     profundidade: 'SINTÉTICA',
    //                     tipoLancamento: 'RECEITA',
    //                     ano: '2016'
    //                 },


    //           ], 
    //           profundidade: 'SINTÉTICA', 
    //           tipoLancamento: 'RECEITA', 
    //           ano: '2016' },

    //       ];
    // }
}
