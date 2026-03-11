import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BookStatus } from '@prisma/client';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman_buku.dto';
import { UpdatePeminjamanBukuDto } from './dto/update-peminjaman_buku.dto';

@Injectable()
export class PeminjamanBukuService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreatePeminjamanBukuDto) {
        const buku = await this.prisma.buku.findUnique({
            where: { id: dto.id_buku },
        });

        if (!buku) {
            throw new NotFoundException('Buku tidak ditemukan');
        }

        if (buku.status === 'BORROWED') {
            throw new NotFoundException('Buku sedang dipinjam');
        }

        const peminjaman = await this.prisma.peminjaman_Buku.create({
            data: {
                id_student: dto.id_student,
                id_buku: dto.id_buku,
                tanggal_pinjam: new Date(dto.tanggal_pinjam),
                tanggal_kembali: dto.tanggal_kembali
                ? new Date(dto.tanggal_kembali) : null,
            },
                include: {
                student: true,
                buku: true,
            },
        });

        await this.prisma.buku.update({
            where: { id: dto.id_buku },
            data: { status: 'BORROWED' },
        });

        return peminjaman;
    }

    async findAll() {
        return this.prisma.peminjaman_Buku.findMany({
            orderBy: { id_peminjaman: 'asc' },

            include: {
                student: true,
                buku: true,
            }
        });
    }

    async findOne(id_peminjaman: number) {
        const peminjaman = await this.prisma.peminjaman_Buku.findUnique({
            where: { id_peminjaman },

            include: {
                student: true,
                buku: true,
            }
        });
        if (!peminjaman) {
            throw new NotFoundException(
                `Peminjaman Buku with ID ${id_peminjaman} not found`,
            );
        }
        return peminjaman;
    }

    async update(id_peminjaman: number, dto: UpdatePeminjamanBukuDto) {
        await this.findOne(id_peminjaman); // Ensure peminjaman exists
        return this.prisma.peminjaman_Buku.update({
            where: { id_peminjaman },
            data: dto,
        });
    }

    async remove(id_peminjaman: number) {
        const peminjaman = await this.findOne(id_peminjaman);

        await this.prisma.buku.update({
            where: { id: peminjaman.id_buku },
            data: { status: 'AVAILABLE' },
        });

        return this.prisma.peminjaman_Buku.delete({
            where: { id_peminjaman },
        });
    }
}