import Fastify from 'fastify';
import users from './routes/users/user.js'
import reports from './routes/reports/report.js'
const fastify = Fastify({ logger: true });
import fastifyMongo from '@fastify/mongodb';

import { MongoClient } from 'mongodb';



fastify.register(fastifyMongo, {
    forceClose: true,
    url: "mongodb+srv://api:senhaapi@robson.1kne10m.mongodb.net/?retryWrites=true&w=majority&appName=robson"
})
fastify.register(import("@fastify/cors"), {
  origin: "*"
})
fastify.register(users)
fastify.register(reports)

fastify.get('/', function (_,reply) {
  reply.send("bogos binted👽");
})
  
  fastify.listen({ port: 8080, host: '0.0.0.0' }, err => {
    if (err) throw err
  })

