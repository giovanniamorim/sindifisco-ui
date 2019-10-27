export interface TipoLancamento {
    valor: string;
    descricao: string;
  }

export interface SupCaixa {
valor: string;
descricao: string;
}

export interface TipoProfundidade {
    valor: string;
    descricao: string;
}

export interface ContaPai {
    id: number;
    descricao: string;
}

export class PlanoConta {
    id: number;
    codigo: string;
    descricao: string;

    contasPais: ContaPai [] = [
        {id: 1, descricao: 'Receitas Correntes'},
        { id: 2, descricao: 'Receitas Gerais'}
    ];

    profundidades: TipoProfundidade [] = [
        { valor: 'ANALÍTICA', descricao: 'ANALÍTICA' },
        { valor: 'SINTÉTICA', descricao: 'SINTÉTICA' }
    ];

    tiposLancamentos: TipoLancamento [] = [
        { valor: 'RECEITA', descricao: 'RECEITA' },
        { valor: 'DESPESA', descricao: 'DESPESA' }
    ];

    ano: string;

    // outras propriedades
    valorTipoLanc: string;
    valorProf: string;

    /**
     * Constructor
     *
     * @param planoConta
     */
    constructor(planoConta?)
    {
        planoConta = planoConta || {};
        this.id = planoConta.id ;
        this.codigo = planoConta.codigo || '';
        this.descricao = planoConta.descricao || '';
        this.contasPais = planoConta.contasPais || '';
        this.profundidades = planoConta.profundidades || '';
        this.tiposLancamentos = planoConta.tiposLancamentos || '';
        this.ano  = planoConta.ano || '';
    }

}


