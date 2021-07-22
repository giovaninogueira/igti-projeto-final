import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import VendaEntity from './venda.entity'

@Table({
  tableName: 'clientes'
})
export default class ClienteEntity extends Model<ClienteEntity> {
    @PrimaryKey
    @Column({
      field: 'cliente_id'
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
    vendas!: VendaEntity
}
