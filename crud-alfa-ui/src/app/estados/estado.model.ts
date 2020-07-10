export interface Estado {
    _id: string;
    id: number;
    nome: string;
    abreviacao: string;
    dataCriacao: Date;
    dataUltimaAlteracao: Date;
}

export interface ResponseEstados {
    estados: Estado[];
}

export interface RequestCreateEstado {
    nome: string;
    abreviacao: string;
}
