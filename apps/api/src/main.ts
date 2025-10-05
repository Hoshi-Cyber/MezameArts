import Fastify from 'fastify';
import cors from '@fastify/cors';

const buildServer = async () => {
  const app = Fastify({ logger: true });
  await app.register(cors, { origin: '*' });
  app.get('/health', async () => {
    return { status: 'ok' };
  });
  // placeholder route for artworks
  app.get('/artworks', async () => {
    return [];
  });
  return app;
};

if (require.main === module) {
  buildServer().then((app) => {
    app.listen({ port: Number(process.env.PORT) || 4000 }, (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      console.log('API server running');
    });
  });
}

export default buildServer;
