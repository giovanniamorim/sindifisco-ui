import { AuthService } from './../../../seguranca/auth.service';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import { LancamentosReceitasService } from './lancamentos-receitas.service';
import Swal from 'sweetalert2';

@Component({
    selector     : 'lancamentos-receitas',
    templateUrl  : './lancamentos-receitas.component.html',
    styleUrls    : ['./lancamentos-receitas.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class LancamentosReceitasComponent implements OnInit
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'imagemDocumento', 'data', 'planoConta', 'modoPagamento', 'tipoDocumento', 
                        'supCaixa', 'valor', 'acoes'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _lancamentosReceitasService: LancamentosReceitasService,
        private _auth: AuthService
    )
    {
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
        this.dataSource = new FilesDataSource(this._lancamentosReceitasService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    deleteReceita(id: number): void {
        // SweetAlert
        Swal.fire({
            title: 'Deseja deletar?',
            text: 'Esta ação é irreversível!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, delete!',
            cancelButtonText: 'Não, cancele!',
            reverseButtons: true
          }).then((result) => {
                if (result.value) {
                this._lancamentosReceitasService.deleteReceita(+ id)
                    .subscribe(res => {
                        console.log(res);
                        this._lancamentosReceitasService.getReceitas();
                    });
                    Swal.fire(
                        'Deletado!',
                        'Seu registro foi deletado com sucesso!',
                        'success');
                } else {
                    Swal.fire(
                        'Cancelado!',
                        'A deleção do registro foi cancelada!',
                        'success'
                      );
                }
        });
    }
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {LancamentosReceitasService} _lancamentosReceitasService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _lancamentosReceitasService: LancamentosReceitasService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._lancamentosReceitasService.receitas;
        
    }

    // tipoLancamentoFilter: any = { tipoLancamento: 'RECEITA' };

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._lancamentosReceitasService.onReceitasChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._lancamentosReceitasService.receitas.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                // case 'imagemDocumento':
                //     [propertyA, propertyB] = [a.id, b.id];
                //     break;
                case 'data':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'planoConta':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;  
                case 'modoPagamento':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'tipoDocumento':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'supCaixa':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'valor':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
