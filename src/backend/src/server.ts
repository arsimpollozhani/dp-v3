import "dotenv/config";
import { buildApp } from "./app.js";

const port = Number(process.env["PORT"] ?? 3000);

async function main(): Promise<void> {
  const app = await buildApp();
  await app.listen({ port, host: "0.0.0.0" });
}

main().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
