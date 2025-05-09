export default async function (fastify) {
fastify.post('/user', async (req) => {
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

fastify.get('/users', async function () {
    const db = this.mongo.client.db('projetoI'); 
    const users = db.collection('users');
    try {
      const allUsers = users.find({}).toArray();
      return allUsers;
    } catch (err) {
      return { error: err.message };
    }
  })
  
  

} 