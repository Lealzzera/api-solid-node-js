import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register.service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case Tests", () => {
	const usersRepository = new InMemoryUsersRepository();
	const registerUseCase = new RegisterUseCase(usersRepository);

	const userMock = {
		name: "John Doe",
		email: "john@acme.com",
		password: "test1234%",
	};

	it("It should hash password uppon registration", async () => {
		const userCreated = await registerUseCase.execute(userMock);
		const isPasswordCorrectlyHashed = await compare(
			"test1234%",
			userCreated.user.password_hash
		);

		expect(isPasswordCorrectlyHashed).toBeTruthy();
	});

	it("It should check if email already exists", async () => {
		await registerUseCase.execute({ ...userMock, email: "john2@acme.com" });

		expect(() =>
			registerUseCase.execute({ ...userMock, email: "john2@acme.com" })
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("It should be able to register", async () => {
		const userCreated = await registerUseCase.execute({
			...userMock,
			email: "john3@acme.com",
		});
		expect(userCreated.user.id).toEqual(expect.any(String));
	});
});
