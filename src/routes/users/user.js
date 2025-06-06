export default async function (fastify) {
  fastify.post('/admin', async (req) => {
      const db = fastify.mongo.client.db('projetoI');
      const users = db.collection('users');
      try {
        const { email, senha, nome} = req.body;
        const funcao = true;
    
        const newUser = await users.insertOne({ "email": email,"nome": nome, "senha": senha, "funcao": funcao });
        return newUser;
      } catch (err) {
        return { error: err.message };
      }
    })
  fastify.post('/user', async (req) => {
      const db = fastify.mongo.client.db('projetoI');
      const users = db.collection('users');
      try {
        const { email, senha, nome} = req.body;
        const funcao = false;
    
        const newUser = await users.insertOne({ "email": email,"nome": nome, "senha": senha, "funcao": funcao });
        return newUser;
      } catch (err) {
        return { error: err.message };
      }
    })  

  fastify.post('/users', async function () {
      const db = fastify.mongo.client.db('projetoI');
      const users = db.collection('users');
      try {
        const { email, senha } = req.body;
        const user = await users.findOne({ email: email, senha: senha });
        if (user) {
          return { message: 'Login efetuado com sucesso!', user: user };
        } else {
          return { error: 'E-mail ou senha inválida.' };
        }
      } catch (err) {
        return { error: err.message };
      }
    })
    
  fastify.get('/admins', async function (req, reply) {
      const db = this.mongo.client.db('projetoI'); 
      const users = db.collection('users');
      try {
        const admins = await users.find({ funcao: true }).toArray();
        return admins;
      } catch (err) {
        return { error: err.message };
    } 
  })

} 