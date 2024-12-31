import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
    async store(request, response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        const userEmailorPasswordIncorrect = () => {
            return response
                .status(400)
                .json({ error: 'Verifique se seu email ou senha estão corretos' });
        };

        // Se a validação falhar, retorna imediatamente
        if (!(await schema.isValid(request.body))) return userEmailorPasswordIncorrect();

        const { email, password } = request.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) return userEmailorPasswordIncorrect();

        if (!(await user.checkPassword(password))) return userEmailorPasswordIncorrect();

        // Só chega aqui se o usuário for autenticado com sucesso
        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
        });
    }
}

export default new SessionController();
