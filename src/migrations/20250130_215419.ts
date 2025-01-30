import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_posts_fk";
  
  DROP INDEX IF EXISTS "search_rels_posts_id_idx";
  ALTER TABLE "search_rels" ADD COLUMN "markdown_posts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_markdown_posts_fk" FOREIGN KEY ("markdown_posts_id") REFERENCES "public"."markdown_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "search_rels_markdown_posts_id_idx" ON "search_rels" USING btree ("markdown_posts_id");
  ALTER TABLE "search_rels" DROP COLUMN IF EXISTS "posts_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_markdown_posts_fk";
  
  DROP INDEX IF EXISTS "search_rels_markdown_posts_id_idx";
  ALTER TABLE "search_rels" ADD COLUMN "posts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  ALTER TABLE "search_rels" DROP COLUMN IF EXISTS "markdown_posts_id";`)
}
