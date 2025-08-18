/*
  Warnings:

  - You are about to drop the column `journal` on the `Tank` table. All the data in the column will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Todo" DROP CONSTRAINT "Todo_tank_id_fkey";

-- AlterTable
ALTER TABLE "public"."Tank" DROP COLUMN "journal";

-- DropTable
DROP TABLE "public"."Todo";

-- CreateTable
CREATE TABLE "public"."TankJournal" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "tank_id" TEXT NOT NULL,

    CONSTRAINT "TankJournal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL,
    "recur_interval_days" INTEGER,
    "tank_id" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TankJournal_tank_id_key" ON "public"."TankJournal"("tank_id");

-- AddForeignKey
ALTER TABLE "public"."TankJournal" ADD CONSTRAINT "TankJournal_tank_id_fkey" FOREIGN KEY ("tank_id") REFERENCES "public"."Tank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_tank_id_fkey" FOREIGN KEY ("tank_id") REFERENCES "public"."Tank"("id") ON DELETE CASCADE ON UPDATE CASCADE;
