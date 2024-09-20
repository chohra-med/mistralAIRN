
// mirage/server.ts
import { createServer, Model } from 'miragejs';
import { Property } from '../types';
import { MOCKED_PROPERTIES_DATA } from '../constant';




export function makeServer() {
    return createServer({
        models: {
            properties: Model.extend<Partial<Property>>({}),
        },
        fixtures: { properties: MOCKED_PROPERTIES_DATA },
        seeds(server) {
            server.loadFixtures();
        },
        routes() {
            this.namespace = 'api/properties';
            this.get('/', (schema) => {
                console.log({ schema });
                //@ts-ignore
                return schema.properties.all();
            });



        },
    });
}
