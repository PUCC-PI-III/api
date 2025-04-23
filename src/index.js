
const fastify = require('fastify')({logger: true});

fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: "mongodb+srv://config@robson.1kne10m.mongodb.net/?retryWrites=true&w=majority&appName=robson"
})

fastify.get('/user/:email', async function (req, reply) {
    const users = this.mongo.db.collection('users')
    const email = "primeiro@gmail.com"
    try {
      const usuario = await users.findOne(req.params.email)
      return usuario
    } catch (err) {
      return err
    }
  })
  
  fastify.listen({ port: 3000 }, err => {
    if (err) throw err
  })

