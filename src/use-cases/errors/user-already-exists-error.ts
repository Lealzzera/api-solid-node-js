export class UserAlreadyExistsError extends Error {
	constructor() {
		super("User e-mail provided already exists.");
	}
}
