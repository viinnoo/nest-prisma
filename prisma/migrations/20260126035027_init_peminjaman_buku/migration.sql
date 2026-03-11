-- AlterTable
ALTER TABLE `peminjaman_buku` ADD COLUMN `tanggal_kembali` DATETIME(3) NULL,
    ADD COLUMN `tanngal_pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
