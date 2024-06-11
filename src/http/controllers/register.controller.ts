import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { registerService } from "@/use-cases/register.service";

export async function register(req: FastifyRequest, res: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { name, email, password } = registerBodySchema.parse(req.body);

	try {
		await registerService({ name, email, password });
	} catch (err) {
		return res.status(409).send();
	}

	return res.status(201).send();
}
