export interface TipoLancamento {
    valor: string;
    descricao: string;
  }

export enum SupCaixaEnum {
    SIM = 'SIM',
    NÃO = 'NÃO'
}

export enum AnoEnum {
    _2016 = '2016',
    _2017 = '2017',
    _2018 = '2018',
    _2019 = '2019',
    _2020 = '2020',
    _2021 = '2021',
    _2022 = '2022',
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


