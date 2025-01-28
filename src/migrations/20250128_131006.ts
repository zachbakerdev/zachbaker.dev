import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_markdown_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__markdown_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "markdown_posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "markdown_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_markdown_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "markdown_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"markdown_posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_markdown_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_markdown_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__markdown_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_markdown_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"markdown_posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "markdown_posts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "markdown_posts_populated_authors" ADD CONSTRAINT "markdown_posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markdown_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "markdown_posts" ADD CONSTRAINT "markdown_posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "markdown_posts" ADD CONSTRAINT "markdown_posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "markdown_posts_rels" ADD CONSTRAINT "markdown_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."markdown_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "markdown_posts_rels" ADD CONSTRAINT "markdown_posts_rels_markdown_posts_fk" FOREIGN KEY ("markdown_posts_id") REFERENCES "public"."markdown_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "markdown_posts_rels" ADD CONSTRAINT "markdown_posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "markdown_posts_rels" ADD CONSTRAINT "markdown_posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v_version_populated_authors" ADD CONSTRAINT "_markdown_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markdown_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v" ADD CONSTRAINT "_markdown_posts_v_parent_id_markdown_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."markdown_posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v" ADD CONSTRAINT "_markdown_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v" ADD CONSTRAINT "_markdown_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v_rels" ADD CONSTRAINT "_markdown_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_markdown_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v_rels" ADD CONSTRAINT "_markdown_posts_v_rels_markdown_posts_fk" FOREIGN KEY ("markdown_posts_id") REFERENCES "public"."markdown_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v_rels" ADD CONSTRAINT "_markdown_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_markdown_posts_v_rels" ADD CONSTRAINT "_markdown_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "markdown_posts_populated_authors_order_idx" ON "markdown_posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "markdown_posts_populated_authors_parent_id_idx" ON "markdown_posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "markdown_posts_hero_image_idx" ON "markdown_posts" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "markdown_posts_meta_meta_image_idx" ON "markdown_posts" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "markdown_posts_slug_idx" ON "markdown_posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "markdown_posts_updated_at_idx" ON "markdown_posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "markdown_posts_created_at_idx" ON "markdown_posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "markdown_posts__status_idx" ON "markdown_posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "markdown_posts_rels_order_idx" ON "markdown_posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "markdown_posts_rels_parent_idx" ON "markdown_posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "markdown_posts_rels_path_idx" ON "markdown_posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "markdown_posts_rels_markdown_posts_id_idx" ON "markdown_posts_rels" USING btree ("markdown_posts_id");
  CREATE INDEX IF NOT EXISTS "markdown_posts_rels_categories_id_idx" ON "markdown_posts_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "markdown_posts_rels_users_id_idx" ON "markdown_posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_populated_authors_order_idx" ON "_markdown_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_populated_authors_parent_id_idx" ON "_markdown_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_parent_idx" ON "_markdown_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_version_hero_image_idx" ON "_markdown_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_meta_version_meta_image_idx" ON "_markdown_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_version_slug_idx" ON "_markdown_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_version_updated_at_idx" ON "_markdown_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_version_created_at_idx" ON "_markdown_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_version_version__status_idx" ON "_markdown_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_created_at_idx" ON "_markdown_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_updated_at_idx" ON "_markdown_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_latest_idx" ON "_markdown_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_autosave_idx" ON "_markdown_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_rels_order_idx" ON "_markdown_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_rels_parent_idx" ON "_markdown_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_rels_path_idx" ON "_markdown_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_rels_markdown_posts_id_idx" ON "_markdown_posts_v_rels" USING btree ("markdown_posts_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_rels_categories_id_idx" ON "_markdown_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_markdown_posts_v_rels_users_id_idx" ON "_markdown_posts_v_rels" USING btree ("users_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_markdown_posts_fk" FOREIGN KEY ("markdown_posts_id") REFERENCES "public"."markdown_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_markdown_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("markdown_posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "markdown_posts_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "markdown_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "markdown_posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_markdown_posts_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_markdown_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_markdown_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "markdown_posts_populated_authors" CASCADE;
  DROP TABLE "markdown_posts" CASCADE;
  DROP TABLE "markdown_posts_rels" CASCADE;
  DROP TABLE "_markdown_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_markdown_posts_v" CASCADE;
  DROP TABLE "_markdown_posts_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_markdown_posts_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_markdown_posts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "markdown_posts_id";
  DROP TYPE "public"."enum_markdown_posts_status";
  DROP TYPE "public"."enum__markdown_posts_v_version_status";`)
}
