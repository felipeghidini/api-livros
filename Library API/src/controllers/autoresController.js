import autores from '../models/Autor.js';

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado)
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorById = await autores.findById(id);
      res.status(200).json(autorById);
    } catch  {
      res.status(500).send({message: `falha ao consultar autor.`});
    }
  }

  static cadastrarAutor = async (req, res) => {
    try {
      let autorCadastrado = new autores(req.body);
      autorCadastrado.save();
        res.status(201).send(autorCadastrado.toJSON());
    } catch {
      res.status(500).send({message: `falha ao cadastrar autor.`});
    }
  }

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: 'Autor atualizado com sucesso!'});
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  }

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: 'Autor excluído com sucesso!'});
    } catch (error) {
      res.status(500).send({message: `falha ao excluir autor.`});
    }
  }
}

export default AutorController;