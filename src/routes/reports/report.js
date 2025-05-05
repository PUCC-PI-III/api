
import fastifyMultipart from '@fastify/multipart';

export default async function (fastify) {
    fastify.register(fastifyMultipart); 

    fastify.post('/riscos', async (req, reply) => {
        const db = fastify.mongo.client.db('projetoI');
        const riscos = db.collection('riscos');

        try {
            const data = await req.file();
            const tit = data.fields.titulo.value;
            const obs = data.fields.obs.value;
            const localizacao = data.fields.localizacao.value;

            const buffoon = await data.toBuffer();
            const b64 = buffoon.toString('base64');

            const newRisk = await riscos.insertOne({tit,obs,localizacao,imagem: b64,
            });

            reply.code(201).send(newRisk);
        } catch (err) {
            reply.code(500).send({ error: err.message });
        }
    });

    fastify.get('/riscos/:id', async (req, reply) => {
        const db = fastify.mongo.client.db('projetoI');
        const riscos = db.collection('riscos');

        try {
            const { id } = req.params;
            const risk = await riscos.findOne({ _id: new fastify.mongo.ObjectId(id) });
            const buffoon = Buffer.from(risk.imagem, 'base64');

            reply.header('Content-Type', 'image/png').send(buffoon);
        } catch (err) {
            reply.code(500).send({ error: err.message });
        }
    });
}