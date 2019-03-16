import { Request, Response } from 'express';
import { RiNovelController, RiNovelcheme, RiChapterScheme } from '../Database/RiNovel';
import * as mongoose from 'mongoose';

/**
 * GET /novels
 * get The list of novel to read.
 */
export let indexList = (req: Request, res: Response) => {
	var novelInfoModel = mongoose.model('Novels', RiNovelcheme);
	novelInfoModel.find().exec((err, novel) => {
		if (err) {
			res.send(err);
		}

		res.render('novels/all', {
			title: 'All Novels',
			novel: novel
		});
	});
};

/**
 * GET /:novelId/toc
 * get The collection of chapters advailable to read.
 */
export let indexToc = (req: Request, res: Response) => {
	var chapterInfoModel = mongoose.model(`${req.params.novelId}`, RiChapterScheme);

	chapterInfoModel.find().exec((err, chapter) => {
		if (err) {
			res.send(err);
		}

		res.render(`novels/toc`, {
			title: `Table of Contents`,
			chapter: chapter,
			url: req.params.novelId
		});
	});
};

/**
 * GET /:novelId/chapter-:chapterId
 * get the chapter to read from a novel.
 */
export let indexChapter = (req: Request, res: Response) => {
	var chapterInfoModel = mongoose.model(req.params.novelId, RiChapterScheme);

	chapterInfoModel.find({ _id: req.params.chapterId }).exec((err, chapter) => {
		if (err) {
			res.send(err);
		}
		res.render(`novels/chapter`, {
			title: `Chapter`,
			chapter: chapter
		});
	});
};

/**
 * POST /:novelId
 * post a new novel
 */
export let postNovel = (req: Request, res: Response) => {
	res.render(`novels/addNovel`, {
		title: `Create Novel`
	});
};

/**
 * POST /:novelId/chapter-:chapterId
 *
 */
export let postChapter = (req: Request, res: Response) => {
	var chapterInfoModel = mongoose.model(`${req.params.novelId}`, RiChapterScheme);

	var array = {
		title: req.body.chapterTitle,
		content: req.body.chapterContent
	};

	let newChapterInfo = new chapterInfoModel(array);

	newChapterInfo.save((err, book) => {
		if (err) {
			res.send({ error: err, affected: book });
		} else if (!err) {
			res.redirect('/novels/' + req.params.novelId);
		}
	});
};

/**
 * PUT /:novelId
 */
export let updateNovel = (req: Request, res: Response) => {
	var novelInfoModel = mongoose.model(`${req.params.novelId}`, RiChapterScheme);
	novelInfoModel.update(
		{ _id: req.params.novelId },
		{
			$set: {
				novelName: req.body.novelName,
				novelAuthor: req.body.novelAuthor,
				novelCoverArt: req.body.cover,
				novelShortDes: req.body.novelShortDes,
				novelTags: req.body.tags
			}
		},
		(err, documents) => {
			if (err) {
				res.send({ error: err, affected: documents });
			} else {
				res.redirect('/novels/' + req.params.novelId + '/chapter-' + req.params.chapterId);
			}
		}
	);
};

/**
 * PUT /:novelId/chapter-:chapterId
 */
export let updatechapter = (req: Request, res: Response) => {
	var chapterInfoModel = mongoose.model(`${req.params.novelId}`, RiChapterScheme);
	chapterInfoModel.update(
		{ _id: req.params.chapterId },
		{ $set: { title: req.body.chaptertitle, content: req.body.chapterContent } },
		(err, documents) => {
			if (err) {
				res.send({ error: err, affected: documents });
			} else {
				res.redirect('/novels/' + req.params.novelId + '/chapter-' + req.params.chapterId);
			}
		}
	);
};
