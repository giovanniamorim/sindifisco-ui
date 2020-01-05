import { AuthGuard } from './../seguranca/auth.guard';
import { AuthService } from './../seguranca/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule, MatDatepicker, MatDatepickerModule, MatSlideToggleModule, MatRadioModule, MatCardModule
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
        resolve  : {
            data: DespesaService
        }
    },
    
];

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
        AuthService
    ]
})
export class ContabilModule
{
}

