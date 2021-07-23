import { mongoose } from '../databases/mongoDB/mongoose'

export interface ILivroInfoEntity {
    livroId: number;
    descricao: string;
    paginas: number;
    editora: string,
    avaliacoes: Array<{
        nome: string,
        nota: number,
        avaliacao: string
    }>
  }

const schema = new mongoose.Schema<ILivroInfoEntity>({
  livroId: { type: Number, required: true },
  descricao: { type: String, required: true },
  paginas: { type: Number, required: true },
  editora: { type: String, required: true },
  avaliacoes: [{
    nome: { type: String, required: true },
    nota: { type: Number, required: true },
    avaliacao: { type: String, required: true }
  }]
})

const LivroInfoEntity = mongoose.model<ILivroInfoEntity>('livroInfo', schema)

export default LivroInfoEntity
