import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import ClienteEntity from './cliente.entity'
import LivroEntity from './livro.entity'

@Table({
  tableName: 'vendas',
  timestamps: false
})
export default class VendaEntity extends Model<VendaEntity> {
  @PrimaryKey
  @Column({
    field: 'venda_id',
    autoIncrement: true,
    allowNull: false
  })
  vendaId!: number;

  @Column
  valor!: number;

  @Column
  data!: Date;

  @ForeignKey(() => ClienteEntity)
  @Column({
    field: 'cliente_id'
  })
  clienteId!: number;

  @ForeignKey(() => LivroEntity)
  @Column({
    field: 'livro_id'
  })
  livroId!: number;

  @BelongsTo(() => ClienteEntity)
  cliente!: ClienteEntity

  @BelongsTo(() => LivroEntity)
  livro!: LivroEntity
}
