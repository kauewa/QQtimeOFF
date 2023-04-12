import { Funcao } from "src/funcao/entities/funcao.entity";
import { Solicitacoes } from "src/solicitacoes/entities/solicitacoe.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity()
export class Colaborador {

    @PrimaryColumn()
    matricula: string;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    inicio_contratacao: Date;

    @Column()
    fim_aquisitivo: Date;

    @Column()
    gestor: boolean;

    @Column()
    clt: boolean;

    @Column()
    saldo_ferias: number;

    @Column()
    senha: string;

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.senha = await bcrypt.hash(this.senha, salt);
    }

    @ManyToOne((type) => Funcao)
    @JoinColumn({name: 'funcao_idfuncao'})
    funcao: Funcao | number;

    @ManyToOne((type) => Colaborador, {nullable: true})
    @JoinColumn({name: 'colaborador_matricula'})
    gestor_colaborador: Colaborador;

    @OneToMany((type) => Colaborador, (colaborador) => colaborador.gestor_colaborador)
    colaboradores: Colaborador[];

    
    @OneToMany((type) => Solicitacoes, (solcitacoes) => solcitacoes.colaborador, {nullable: true})
    solicitacoes: Solicitacoes[];
}
