export class CreatePeminjamanBukuDto {
    id_student: number;
    id_buku: number;
    tanggal_pinjam: string;
    tanggal_kembali?: string;
}