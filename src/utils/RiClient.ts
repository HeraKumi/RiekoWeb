import * as mongoose from 'mongoose';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import rootRouter from '../routes/root';

export class RiClient {
	public mongoUrl: string = process.env.MONGODTEST;
	public app: express.Application;

	public constructor() {
		this.mongoConnect();
		this.app = express();
		this._Middleware();
		this.routes();
	}

	private mongoConnect(): void {
		require('mongoose').Promise = global.Promise;
		try {
			mongoose.connect(this.mongoUrl, {
				useNewUrlParser: true
			});
		} catch (error) {}
	}

	private _Middleware() {
		this.app.set('views', path.join(__dirname, '../public/views'));
		this.app.set('view engine', 'pug');
		this.app.use(compression());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(express.static(path.join(__dirname, '../public'), {
			maxAge: 31557600000
		}));
	}

	private routes() {
		this.app.use('/', rootRouter);
	}
}