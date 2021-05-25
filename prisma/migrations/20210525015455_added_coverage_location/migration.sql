-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ejen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "coverage_location" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Ejen" ("address", "country", "createdAt", "id", "name", "updatedAt") SELECT "address", "country", "createdAt", "id", "name", "updatedAt" FROM "Ejen";
DROP TABLE "Ejen";
ALTER TABLE "new_Ejen" RENAME TO "Ejen";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
