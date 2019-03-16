import { Request, Response } from 'express';
import { RiNovelController, RiNovelcheme } from '../Database/RiNovel';
import * as mongoose from 'mongoose';

export let index = (req: Request, res: Response) => {
	res.render('test', {
		title: 'Test'
	});
};

export let postNovel = (req: Request, res: Response) => {
	var novelInfoModel = mongoose.model('Novels', RiNovelcheme);

	var array = {
		novelName: req.body.novelName,
		novelAuthor: req.body.novelAuthor,
		novelCoverArt: req.body.novelArt,
		//novelTags: [ 'Evil MC', 'Op MC', 'System' ],
		novelSummary: req.body.novelSummary
	};

	let newNovelInfoModel = new novelInfoModel(array);
	newNovelInfoModel.save((err, novel) => {
		if (err) {
			res.send({error: err, affected: novel});
		} else {
			res.redirect('/test');
		}
	});
};
