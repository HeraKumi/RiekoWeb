import { Request, Response } from 'express';

/**
 * GET /commands
 * Commands page.
 */
export let index = (req: Request, res: Response) => {
	res.render('commands', {
		title: 'Commands'
	});
};

//TODO: Create a auto list of commands the bot have
