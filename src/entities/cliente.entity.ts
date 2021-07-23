import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import VendaEntity from './venda.entity'

@Table({
  tableName: 'clientes',
  timestamps: false
})
export default class ClienteEntity extends Model<ClienteEntity> {
    @PrimaryKey
    @Column({
      field: 'cliente_id',
      autoIncrement: true,
      allowNull: false
    })
    clienteId!: number;

    @Column
    nome!: string;

    @Column
    email!: string;

    @Column
    senha!: string;

    @Column
    telefone!: string;

    @Column
    endereco!: string;

    @HasMany(() => VendaEntity)
    vendas!: VendaEntity[]
}
