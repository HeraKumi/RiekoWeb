export interface ChapterObj {
	_id: string;
	title: string;
	content: string;
	__v: number;
}

export namespace Convertc {
	export function toChapterObj(json: string): ChapterObj {
		return JSON.parse(json);
	}

	export function chapterObjToJson(value: ChapterObj): string {
		return JSON.stringify(value);
	}
}
