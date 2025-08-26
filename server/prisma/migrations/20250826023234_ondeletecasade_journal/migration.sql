-- DropForeignKey
ALTER TABLE "public"."TankJournal" DROP CONSTRAINT "TankJournal_tank_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."TankJournal" ADD CONSTRAINT "TankJournal_tank_id_fkey" FOREIGN KEY ("tank_id") REFERENCES "public"."Tank"("id") ON DELETE CASCADE ON UPDATE CASCADE;
