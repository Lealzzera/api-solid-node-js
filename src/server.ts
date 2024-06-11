import { app } from "@/app";
import { env } from "@/env/index";

app
	.listen({
		host: env.HOST,
		port: env.PORT,
	})
	.then(() => {
		console.info("HTTP SERVER RUNNING 🚀");
	});
