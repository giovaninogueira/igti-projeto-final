import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import LivroEntity from './livro.entity'

@Table({
  tableName: 'autores',
  timestamps: false
})
export default class AutorEntity extends Model<AutorEntity> {
    @PrimaryKey
    @Column({
      field: 'autor_id',
      autoIncrement: true,
      allowNull: false
    })
    autorId!: number;

    @Column
    nome!: string;

    @Column
    email!: string;

    @Column
    telefone!: string;

    @HasMany(() => LivroEntity)
    livros!: LivroEntity[]
}
