export interface Cidade {
    _id: string;
    id: number;
    nome: string;
    estadoId: string;
    dataCriacao: Date;
    dataUltimaAlteracao: Date;
    nomeEstado: string;
}

export interface ResponseCidades {
    cidades: Cidade[];
}

export interface RequestCreateCidade {
    nome: string;
    estadoId: string;
}
