import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

export interface IServerConfiguration {
    port: number;
    publicPath: string;
}

export class Server {
    constructor(private config: IServerConfiguration) {
        this.app = express();

        this.app.use(express.static(config.publicPath));

        this.app.use((req, res, next) => {
            if (req.accepts('html')) {
				const indexPath = path.join(__dirname, '../../client/index.html');
                res.sendFile(indexPath);
            }
            else {
				console.log('next called');
                next();
            }
        });
    }

    listen(callback: () => void): void {
        this.app.listen(this.config.port, callback);
    }

    private app: any;
}
