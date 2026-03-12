/*
  Warnings:

  - You are about to drop the column `tanngal_pinjam` on the `peminjaman_buku` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `buku` ADD COLUMN `status` ENUM('AVAILABLE', 'BORROWED') NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE `peminjaman_buku` DROP COLUMN `tanngal_pinjam`,
    ADD COLUMN `tanggal_pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Pengembalian_Buku` (
    `id_pengembalian` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peminjaman` INTEGER NOT NULL,
    `tanggal_pengembalian` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pengembalian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'PETUGAS', 'STUDENT') NOT NULL,
    `id_student` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_id_student_key`(`id_student`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengembalian_Buku` ADD CONSTRAINT `Pengembalian_Buku_id_peminjaman_fkey` FOREIGN KEY (`id_peminjaman`) REFERENCES `Peminjaman_Buku`(`id_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_student_fkey` FOREIGN KEY (`id_student`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
