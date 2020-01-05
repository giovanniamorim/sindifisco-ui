import { ModoPagamento } from './../../modo-pagamento/modo-pagamento.model';
import { PlanoConta, TipoLancamento, SupCaixa, SupCaixaEnum } from './../../plano-conta/plano-conta.model';
import { TipoDocumento } from '../../tipo-documento/tipo-documento.model';


export class Despesa
{
    id: string;
    data: string;
    planoConta: PlanoConta [];
    modoPagamento: ModoPagamento [];
    tipoLancamento: TipoLancamento [];
    numCheque: string;
    tipoDocumento: TipoDocumento [];
    numDocumento: string;
    supCaixa: SupCaixaEnum;
    observacao: string;
    imagemDocumento: string;
    ano: string;
    valor: string;



    /**
     * Constructor
     *
     * @param despesa
     */
    constructor(despesa?)
    {
        despesa = despesa || {};
        this.id = despesa.id || '';
        this.data = despesa.data || '';
        this.planoConta = despesa.planoConta || '';
        this.modoPagamento = despesa.modoPagamento || '';
        this.tipoLancamento = despesa.tipoLancamento || '';
        this.numCheque = despesa.numCheque || '';
        this.tipoDocumento = despesa.tipoDocumento || '';
        this.numDocumento = despesa.numDocumento || '';
        this.supCaixa = despesa.supCaixa || '';
        this.observacao = despesa.observacao || '';
        this.imagemDocumento = despesa.imagemDocumento || '';
        this.ano = despesa.ano || '';
        this.valor = despesa.valor || '';

    }

 
}
