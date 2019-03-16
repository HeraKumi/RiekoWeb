import { Request, Response } from 'express';

/**
 * GET /stats
 * Riyeko bot stats.
 */
export let index = (req: Request, res: Response) => {
	res.render('stats', {
		title: 'Stats'
	});
};
