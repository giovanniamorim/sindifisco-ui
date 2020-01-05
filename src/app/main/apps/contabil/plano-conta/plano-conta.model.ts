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
    contasPais: ContaPai [] = [];
    profundidades: TipoProfundidade [] = [];
    tiposLancamentos: TipoLancamento [] = [];
    ano: string;

    // outras propriedades
    valorTipoLanc: string;
    valorProf: string;

    /**
     * Constructor
     *
     * @param planoConta
     */
    constructor(planoConta?) {
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


