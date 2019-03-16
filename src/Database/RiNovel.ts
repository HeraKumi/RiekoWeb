import * as mongoose from 'mongoose';
const Scheme = mongoose.Schema;

export const RiNovelcheme = new Scheme({
	novelName: String,
	novelAuthor: String,
	novelCoverArt: String,
	novelSummary: String,
	novelTags: Array
});

export const RiChapterScheme = new Scheme({
	title: String,
	content: String,
	notes: String
});

export class RiNovelController {
	public addNovel(callback: (data) => void) {
		var chapterInfoModel = mongoose.model('Novels', RiNovelcheme);

		var array = {
			novelName: 'Void Empire',
			novelAuthor: 'hoshiko',
			novelCoverArt:
				'http://orig09.deviantart.net/2c10/f/2013/123/6/f/ancient_chinese_emperor_by_sugisaki_key-d63y0mv.jpg',
			novelTags: [ 'system', 'non-beta mc', 'ruthless mc', 'emperor pc', 'kingdom build', 'non-harmen' ],
			novelSummary: 'This is a basic summary of this novel'
		};

		let newChapterInfo = new chapterInfoModel(array);

		newChapterInfo.save((err, book) => {
			if (err) {
				return callback(err);
			} else if (!err) {
				return callback(book.toJSON());
			}
		});
	}

	// public getContacts(req: Request, res: Response) {
	// 	var chapterInfoModel = mongoose.model('Novels', RiNovelcheme);
	// 	chapterInfoModel.collection
	// 		.find()
	// 		.stream()
	// 		.on('data', function(doc) {
	// 			const novelObj = Convert.novelObjToJson(doc);
	// 			res.json(novelObj);
	// 		})
	// 		.on('error', function(err) {})
	// 		.on('end', function() {});
	// }
}
