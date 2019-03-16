import * as mongoose from 'mongoose';
import { Logger, Message, logger } from '@yamdbf/core';

const Scheme = mongoose.Schema;

export const RiTicketScheme = new Scheme(
	{
		type: {
			type: String,
			required: 'Please choose a type of ticket: [bug, report, suggestion]'
		},
		guildFrom: {
			type: String,
			required: 'guild ticket came from'
		},
		content: {
			type: String,
			required: 'Cannot be submited empty'
		},
		status: {
			type: String,
			required: true
		},
		userSubmitted: {
			type: String,
			required: 'User id is required'
		}
	},
	{
		timestamps: true
	}
);
export class RiTicketController {
	public addTicket(
		TIcketType: String,
		UserSubmitted: String,
		GuildFrom: String,
		Content: String,
		callback: (data) => void
	) {
		const Ticket = mongoose.model(`Tickets`, RiTicketScheme);

		var ticketData = {
			type: TIcketType,
			userSubmitted: UserSubmitted,
			guildFrom: GuildFrom,
			content: Content,
			status: 'Reported'
		};
		let newTicket = new Ticket(ticketData);

		newTicket.save((err, ticket) => {
			if (err) {
				Logger.instance().error('RiTicket', err);
			} else if (!err) {
				Logger.instance().info('RiTicket', `Added new ${TIcketType} ticket`);
				return callback(ticket.toJSON());
			}
		});
	}

	public getTicket(UserSubmitted: String, ticketID: String, callback: (data) => void) {
		const Ticket = mongoose.model(`Tickets`, RiTicketScheme);

		if (ticketID != UserSubmitted) {
			return callback('Not Permited'); // TODO: Fix this to check if the user is only checking their own ticket
		} else if (ticketID == UserSubmitted) {
			Ticket.findById(ticketID, (err, ticket) => {
				if (err) {
					Logger.instance().error('RiTicket', err);
				}
				return callback(ticket);
			});
		}
	}

	public getAllTickets(UserSubmitted: String, callback: (data) => void) {
		// TODO: Make this so bot owner can view all tickets
		const Ticket = mongoose.model(`Tickets`, RiTicketScheme);
		return Ticket.find({}, (err, ticket) => {
			if (err) {
				Logger.instance().error('RiTicket', err);
			}
			return callback(ticket);
		});
	}
}
