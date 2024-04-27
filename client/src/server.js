// src/server.js or a dedicated mirage setup file
import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      user: Model,
      message: Model,
    },

    seeds(server) {
      // Seed your server with initial data
      const user = server.create('user', {
        name: 'Jane Doe',
        username: 'janedoe',
        bio: 'Life explorer. Music lover. Foodie. Traveler.'
      });

      server.create('message', {
        id: 1,
        user: user,
        content: 'Hi there!',
        sentAt: new Date()
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', (schema) => {
        return schema.users.all();
      });

      this.get('/messages', (schema) => {
        return schema.messages.all();
      });

      this.post('/messages', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.messages.create(data);
      });

      this.get('/messages/:id', (schema, request) => {
        const id = request.params.id;
        return schema.messages.find(id);
      });

      this.patch('/messages/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const id = request.params.id;
        const message = schema.messages.find(id);

        return message.update(newAttrs);
      });

      this.delete('/messages/:id', (schema, request) => {
        const id = request.params.id;
        return schema.messages.find(id).destroy();
      });
    },
  });
}