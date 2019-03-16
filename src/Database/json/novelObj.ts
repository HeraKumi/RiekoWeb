export interface NovelObj {
	_id: string;
	novelTags: string[];
	novelName: string;
	novelAuthor: string;
	novelCoverArt: string;
	novelId: number;
	__v: number;
}

export namespace Convert {
	export function toNovelObj(json: string): NovelObj {
		return JSON.parse(json);
	}

	export function novelObjToJson(value: NovelObj): string {
		return JSON.stringify(value);
	}
}
