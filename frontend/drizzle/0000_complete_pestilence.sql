-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "urls" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "urls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"shortcode" varchar(7) NOT NULL,
	"long_url" text NOT NULL,
	"user_id" bigint,
	"click_count" bigint DEFAULT 0 NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "urls_shortcode_key" UNIQUE("shortcode")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"auth_token" varchar(255),
	CONSTRAINT "users_email_key" UNIQUE("name"),
	CONSTRAINT "users_auth_token_key" UNIQUE("auth_token")
);
--> statement-breakpoint
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
*/