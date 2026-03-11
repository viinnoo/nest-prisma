/*
  Warnings:

  - You are about to drop the column `tanngal_pinjam` on the `peminjaman_buku` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `peminjaman_buku` DROP COLUMN `tanngal_pinjam`,
    ADD COLUMN `tanggal_pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
