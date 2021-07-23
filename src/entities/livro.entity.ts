import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import AutorEntity from './autor.entity'
import VendaEntity from './venda.entity'

@Table({
  tableName: 'livros',
  timestamps: false
})
export default class LivroEntity extends Model<LivroEntity> {
    @PrimaryKey
    @Column({
      field: 'livro_id',
      autoIncrement: true,
      allowNull: false
    })
    livroId!: number;

    @Column
    nome!: string;

    @Column
    valor!: number;

    @Column
    estoque!: number;

    @ForeignKey(() => AutorEntity)
    @Column({
      field: 'autor_id'
    })
    autorId!: string;

    @BelongsTo(() => AutorEntity)
    autor!: AutorEntity;

    @HasMany(() => VendaEntity)
    vendas!: VendaEntity;
}
