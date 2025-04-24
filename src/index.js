
const fastify = require('fastify')({logger: true});

const mongodb = require('mongodb')
mongodb.MongoClient.connect('mongodb+srv://api:senhaapi@robson.1kne10m.mongodb.net/?retryWrites=true&w=majority&appName=robson')
  .then((client) => {
    const fastify = require('fastify')()

    fastify.register(require('@fastify/mongodb'), { client: client })
      .register(function (fastify, opts, next) {
        const db = fastify.mongo.client.db('projetoI')
        // ...
        // ...
        // ...
        next()
      })
  })
  .catch((err) => {
    throw err
  })
fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: "mongodb+srv://api:senhaapi@robson.1kne10m.mongodb.net/?retryWrites=true&w=majority&appName=robson"
})
fastify.register(import("@fastify/cors"), {
  origin: "*"
})


fastify.get('/users', async function (req, reply) {
  const db = this.mongo.client.db('projetoI'); 
  const users = db.collection('users');
  try {
    const allUsers = users.find({}).toArray();
    return allUsers;
  } catch (err) {
    return { error: err.message };
  }
})

fastify.post('/user', (req) => {
  const db = fastify.mongo.client.db('projetoI');
  const users = db.collection('users');
  try {
    const { email, senha } = req.body;
    const funcao = true;

    const newUser = users.insertOne({ "email": email, "senha": senha, "funcao": funcao });
    return newUser;
  } catch (err) {
    return { error: err.message };
  }
})

fastify.get('/', function (_,reply) {
  reply.send("bogos binted👽");
})
  
  fastify.listen({ port: 3000 }, err => {
    if (err) throw err
  })

