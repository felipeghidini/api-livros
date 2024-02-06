import livros from '../models/Livro.js';

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find()
        .populate('autor').exec();
      res.status(200).json(livrosResultado)
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const livroById = await livros.findById(id)
        .populate('autor', 'nome').exec();
      res.status(200).json(livroById);
    } catch  {
      res.status(500).send({message: `falha ao consultar livro.`});
    }
  }

  static cadastrarLivro = async (req, res) => {
    try {
      let livroCadastrado = new livros(req.body);
        livroCadastrado.save();
        res.status(201).send(livroCadastrado.toJSON());
    } catch {
      res.status(500).send({message: `falha ao cadastrar livro.`});
    }
  }

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: 'Livro atualizado com sucesso!'});
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  }

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: 'Livro excluído com sucesso!'});
    } catch (error) {
      res.status(500).send({message: `falha ao excluir livro.`});
    }
  }

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;

      let livroPorEditora = await livros.find({'editora': editora});
      res.status(200).send(livroPorEditora);
    } catch (error) {
      res.status(500).send({message: `falha ao buscar livro pela editora.`});
    }

  }
}

export default LivroController;