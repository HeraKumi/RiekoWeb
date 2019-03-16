import { Router } from 'express';

import * as homeController from '../controllers/home';
import * as statsController from '../controllers/stats';
import * as commandsController from '../controllers/commands';
import * as testController from '../controllers/test';
import * as novelController from '../controllers/novel';

class Root {
	public router: Router;
	public constructor() {
		this.router = Router();
		this.init();
	}
	private init() {
		this.router.get('/', homeController.index);
		this.router.get('/stats', statsController.index);
		this.router.get('/commands', commandsController.index);
		this.router
			.get('/test', testController.index)
			.post('/test', testController.postNovel);


		this.router
			.get('/novels', novelController.indexList)
			.get(`/novels/:novelId`, novelController.indexToc)
			.put('/novels/:novelId', novelController.updateNovel)
			.post('/novels/:novelId', novelController.postNovel);

		this.router
			.get(`/novels/:novelId/chapter-:chapterId`, novelController.indexChapter)
			.post('/novels/:novelId/chapter-:chapterId:', novelController.postChapter)
			.put('/novels/:novelId/chapter-:chapterId', novelController.updatechapter);
	}
}

const rootRoutes = new Root();
export default rootRoutes.router;
