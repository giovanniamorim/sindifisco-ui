import { AuthGuard } from './../seguranca/auth.guard';
import { AuthService } from './../seguranca/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule, MatDatepicker, MatDatepickerModule, MatSlideToggleModule, MatRadioModule, MatCardModule, NativeDateAdapter
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { TiposDocumentosComponent } from './tipos-documentos/tipos-documentos.component';
import { TiposDocumentosService } from './tipos-documentos/tipos-documentos.service';
import { ModosPagamentosComponent } from './modos-pagamentos/modos-pagamentos.component';
import { ModosPagamentosService } from './modos-pagamentos/modos-pagamentos.service';
import { PlanosContasComponent } from './planos-contas/planos-contas.component';
import { PlanosContasService } from './planos-contas/planos-contas.service';
import { LancamentosReceitasComponent } from './lancamentos/receitas/lancamentos-receitas.component';
import { LancamentosReceitasService } from './lancamentos/receitas/lancamentos-receitas.service';
import { LancamentosDespesasComponent } from './lancamentos/despesas/lancamentos-despesas.component';
import { LancamentosDespesasService } from './lancamentos/despesas/lancamentos-despesas.service';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { TipoDocumentoService } from './tipo-documento/tipo-documento.service';
import { ModoPagamentoComponent } from './modo-pagamento/modo-pagamento.component';
import { ModoPagamentoService } from './modo-pagamento/modo-pagamento.service';
import { PlanoContaComponent } from './plano-conta/plano-conta.component';
import { PlanoContaService } from './plano-conta/plano-conta.service';
import { DespesaComponent } from './lancamentos/despesa/despesa.component';
import { DespesaService } from './lancamentos/despesa/despesa.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { CurrencyMaskModule } from 'ngx-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ngx-currency-mask/src/currency-mask.config';




const routes: Routes = [
    {
        path     : 'tipos-documentos',
        component: TiposDocumentosComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_TIPODOCUMENTO_LISTAR'] },
        resolve  : {
            data: TiposDocumentosService
        }
    },
    {
        path     : 'tipo-documento/:id',
        component: TipoDocumentoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_TIPODOCUMENTO_ATUALIZAR'] },
        resolve  : {
            data: TipoDocumentoService
        }
    },
    {
        path     : 'tipo-documento/:id/:handle',
        component: TipoDocumentoComponent,
        data: { roles: ['ROLE_TIPODOCUMENTO_ATUALIZAR'] },
        canActivate: [AuthGuard],
        resolve  : {
            data: TipoDocumentoService
        }
    },
    {
        path     : 'modos-pagamentos',
        component: ModosPagamentosComponent,
        data: { roles: ['ROLE_MODOPAGAMENTO_LISTAR'] },
        resolve  : {
            data: ModosPagamentosService
        }
    },
    {
        path     : 'modos-pagamentos/:id',
        component: ModoPagamentoComponent,
        resolve  : {
            data: ModoPagamentoService
        }
    },
    {
        path     : 'planos-contas',
        component: PlanosContasComponent,
        resolve  : {
            data: PlanosContasService
        }
    },
    {
        path     : 'planos-contas/:id',
        component: PlanoContaComponent,
        resolve  : {
            data: PlanoContaService
        }
    },
    {
        path     : 'lancamentos/receitas',
        component: LancamentosReceitasComponent,
        data: { 
            roles: ['ROLE_LANCAMENTOS_RECEITAS_LISTAR'] 
        },
        resolve  : {
            data: LancamentosReceitasService
        }
    },
    {
        path     : 'lancamentos/despesas',
        component: LancamentosDespesasComponent,
        data: { 
            roles: ['ROLE_LANCAMENTOS_DESPESAS_LISTAR'] 
        },
        resolve  : {
            data: LancamentosDespesasService
        }
    },
    {
        path     : 'lancamentos/despesa/:id',
        component: DespesaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_LANCAMENTO_ATUALIZAR'] },
        resolve  : {
            data: DespesaService
        }
    },

    
];

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.'
};

@NgModule({
    declarations: [
        TiposDocumentosComponent,
        ModosPagamentosComponent,
        PlanosContasComponent,
        LancamentosReceitasComponent,
        LancamentosDespesasComponent,
        TipoDocumentoComponent,
        ModoPagamentoComponent,
        PlanoContaComponent,
        DespesaComponent,
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatDatepickerModule,
        MatProgressBarModule,
        MatCardModule,
        MatButtonModule,
        CurrencyMaskModule,


        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
        
    ],
    providers   : [
        TiposDocumentosService,
        ModosPagamentosService,
        PlanosContasService,
        LancamentosReceitasService,
        LancamentosDespesasService,
        TipoDocumentoService,
        ModoPagamentoService,
        PlanoContaService,
        DespesaService,
        AuthService,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class ContabilModule
{
}

