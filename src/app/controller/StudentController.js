// Feature for create students
import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  // Create new student
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.string().required(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação. ' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.string(),
      weight: Yup.string(),
      height: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação. ' });
    }

    const { id, email } = req.body;

    const student = await Student.findOne({ where: { id } });

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      // Se o email já estiver sendo usado em outro cadastro, retorna a mensagem de bad_request
      if (studentExists) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
