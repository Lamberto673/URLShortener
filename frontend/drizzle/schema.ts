import { pgTable, foreignKey, unique, bigint, varchar, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const urls = pgTable("urls", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "urls_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	shortcode: varchar({ length: 7 }).notNull(),
	longUrl: text("long_url").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	clickCount: bigint("click_count", { mode: "number" }).default(0).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "urls_user_id_fkey"
		}),
	unique("urls_shortcode_key").on(table.shortcode),
]);

export const users = pgTable("users", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	authToken: varchar("auth_token", { length: 255 }),
}, (table) => [
	unique("users_email_key").on(table.name),
	unique("users_auth_token_key").on(table.authToken),
]);
