import { Colaborador } from "src/colaborador/entities/colaborador.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Funcao {
    @PrimaryGeneratedColumn()
    idfuncao: number;

    @Column()
    nome_funcao: string;

    @OneToMany(() => Colaborador, (colaborador) => colaborador.funcao)
    colaborador: Colaborador[];
}
