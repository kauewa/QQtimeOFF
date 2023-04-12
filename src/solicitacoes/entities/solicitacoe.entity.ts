import { Colaborador } from "src/colaborador/entities/colaborador.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Solicitacoes {
    @PrimaryGeneratedColumn()
    idsolicitacoes: number;

    @Column()
    data_criacao: Date;

    @Column()
    inicio_ferias: Date;

    @Column()
    qtd_dias: number;

    @Column()
    fim_ferias: Date;

    @Column()
    decimo_terceiro: boolean;

    @Column()
    comentario: string;

    @Column()
    status: string;

    @Column()
    retorno: string;

    @ManyToOne((type) => Colaborador)
    @JoinColumn({name: "colaborador_matricula"})
    colaborador: Colaborador;

}
