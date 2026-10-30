import { drizzle } from "drizzle-orm/singlestore";
import * as schema from "@/drizzle/schema";
import * as relations from "@/drizzle/relations";
export const db = drizzle(process.env.POSTGRES_URL!, {
  schema: { ...schema, ...relations },
});
