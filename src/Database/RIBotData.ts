import * as mongoose from 'mongoose';
const Scheme = mongoose.Schema;

export const RiBotDataScheme = new Scheme({
	version: {
		type: String
	},
	status: {
		type: String,
		required: 'Bot status is needed'
	}
});

export class RiBotDataController {
	public addBotData(version: string, status: BotStatusType, callback: (data) => void) {
		const BotData = mongoose.model('Bot_Status', RiBotDataScheme);
	}
}
