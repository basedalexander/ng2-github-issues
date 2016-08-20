import * as path from 'path';

import { Server, IServerConfiguration } from './server/server';

const config: IServerConfiguration = {
    port: 3000,
    publicPath: path.join(__dirname, '../client')
};

const server = new Server(config);

server.listen(() => {
   console.info(`server is listening on port ${config.port}`);
});
