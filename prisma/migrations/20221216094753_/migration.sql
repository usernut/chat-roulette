-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "roleId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "censorship" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "censorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "total_messages" INTEGER NOT NULL DEFAULT 0,
    "total_companions" INTEGER NOT NULL DEFAULT 0,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "censorship_word_key" ON "censorship"("word");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
