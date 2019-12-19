// Feature for create students
import Student from '../models/Student';

class StudentController {
  // Create new student
  async store(req, res) {
    // Verifica se o informado no cadastro, já esta cadastrado
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    // Se o email já estiver sendo usado em outro cadastro, retorna a mensagem de bad_request
    if (studentExists) {
      return res.status(400).json({ error: 'Usuario já existe.' });
    }

    // Seleciona apenas os dados que queremos retornar na tela
    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    // Retorna os dados selecionados, no formato de um objeto -> {}
    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  // Update infos students
  async update(req, res) {
    const { id, email } = req.body;

    const user = await Student.findByPk(req.body);

    /* if (email && email !== user.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'Usuario já existe.' });
      }
    } */

    const { name, age, weight, height } = await user.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
