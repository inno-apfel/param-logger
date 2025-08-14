/*
  Warnings:

  - Added the required column `gallons` to the `Tank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setup_date` to the `Tank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Tank" ADD COLUMN     "gallons" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "journal" JSONB,
ADD COLUMN     "setup_date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."Todo" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recur_interval_days" INTEGER,
    "tank_id" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_tank_id_fkey" FOREIGN KEY ("tank_id") REFERENCES "public"."Tank"("id") ON DELETE CASCADE ON UPDATE CASCADE;
