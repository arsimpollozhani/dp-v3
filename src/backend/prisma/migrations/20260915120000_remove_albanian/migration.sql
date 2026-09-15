-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_menu_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "imageUrl" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "nameEn" TEXT NOT NULL,
    "nameMk" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descMk" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_menu_items" ("category", "createdAt", "descEn", "descMk", "id", "imageUrl", "isAvailable", "nameEn", "nameMk", "price") SELECT "category", "createdAt", "descEn", "descMk", "id", "imageUrl", "isAvailable", "nameEn", "nameMk", "price" FROM "menu_items";
DROP TABLE "menu_items";
ALTER TABLE "new_menu_items" RENAME TO "menu_items";
CREATE INDEX "menu_items_category_idx" ON "menu_items"("category");
CREATE TABLE "new_news_posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "titleEn" TEXT NOT NULL,
    "titleMk" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "bodyMk" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_news_posts" ("bodyEn", "bodyMk", "createdAt", "id", "imageUrl", "publishedAt", "slug", "titleEn", "titleMk", "updatedAt") SELECT "bodyEn", "bodyMk", "createdAt", "id", "imageUrl", "publishedAt", "slug", "titleEn", "titleMk", "updatedAt" FROM "news_posts";
DROP TABLE "news_posts";
ALTER TABLE "new_news_posts" RENAME TO "news_posts";
CREATE UNIQUE INDEX "news_posts_slug_key" ON "news_posts"("slug");
CREATE INDEX "news_posts_publishedAt_idx" ON "news_posts"("publishedAt");
CREATE TABLE "new_team_members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "roleEn" TEXT NOT NULL,
    "roleMk" TEXT NOT NULL,
    "bioEn" TEXT NOT NULL,
    "bioMk" TEXT NOT NULL,
    "photoUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_team_members" ("bioEn", "bioMk", "createdAt", "id", "name", "photoUrl", "roleEn", "roleMk", "sortOrder") SELECT "bioEn", "bioMk", "createdAt", "id", "name", "photoUrl", "roleEn", "roleMk", "sortOrder" FROM "team_members";
DROP TABLE "team_members";
ALTER TABLE "new_team_members" RENAME TO "team_members";
CREATE INDEX "team_members_sortOrder_idx" ON "team_members"("sortOrder");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

