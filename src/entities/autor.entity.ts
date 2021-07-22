import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import LivroEntity from './livro.entity'

@Table({
  tableName: 'autores'
})
export default class AutorEntity extends Model<AutorEntity> {
    @PrimaryKey
    @Column({
      field: 'autor_id'
    })
    autorId!: number;

    @Column
    nome!: string;

    @Column
    email!: string;

    @Column
    telefone!: string;

    @HasMany(() => LivroEntity)
    autor!: LivroEntity
}
