import { relations } from "drizzle-orm/relations";
import { users, urls } from "./schema";

export const urlsRelations = relations(urls, ({one}) => ({
	user: one(users, {
		fields: [urls.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	urls: many(urls),
}));