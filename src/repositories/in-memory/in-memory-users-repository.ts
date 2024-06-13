import { User } from "@prisma/client";
import { UsersRepository } from "../users-respository";

export class InMemoryUsersRepository implements UsersRepository {
	public itens: User[] = [];
	async findByEmail(email: string) {
		const emailFounded = this.itens.find((user) => user.email === email);
		return emailFounded ? emailFounded : null;
	}
	async create(data: User) {
		const user = {
			id: "user-1",
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		};

		this.itens.push(user);

		return user;
	}
}
