-- CreateTable
CREATE TABLE `Peminjaman_Buku` (
    `id_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `id_student` INTEGER NOT NULL,
    `id_buku` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peminjaman_Buku` ADD CONSTRAINT `Peminjaman_Buku_id_student_fkey` FOREIGN KEY (`id_student`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman_Buku` ADD CONSTRAINT `Peminjaman_Buku_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `Buku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
