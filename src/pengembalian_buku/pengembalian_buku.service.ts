import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePengembalianBukuDto } from './dto/create-pengembalian_buku.dto';
import { UpdatePengembalianBukuDto } from './dto/update-pengembalian_buku.dto';

@Injectable()
export class PengembalianBukuService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreatePengembalianBukuDto) {
        const peminjaman = await this.prisma.peminjaman_Buku.findUnique({
            where: { id_peminjaman: dto.id_peminjaman },
        });

        if (!peminjaman) {
            throw new NotFoundException('Data peminjaman tidak ditemukan');
        }

        const sudahDikembalikan = await this.prisma.pengembalian_Buku.findFirst({
            where: { id_peminjaman: dto.id_peminjaman },
        });

        if (sudahDikembalikan) {
            throw new BadRequestException('Buku sudah dikembalikan');
        }

        await this.prisma.buku.update({
            where: { id: peminjaman.id_buku },
                data: { status: 'AVAILABLE' },
        });

        return this.prisma.pengembalian_Buku.create({
            data: {
                id_peminjaman: dto.id_peminjaman,
                tanggal_pengembalian: new Date(dto.tanggal_pengembalian),
            },
            include: {
                peminjaman: true,
            },
        });
    }

    async findAll() {
        return this.prisma.pengembalian_Buku.findMany({
            orderBy: { id_pengembalian: 'asc' },
            
            include: {
                peminjaman: true,
            }
        });
    }

    async findOne(id_pengembalian: number) {
        const pengembalian = await this.prisma.pengembalian_Buku.findUnique({
            where: { id_pengembalian },

            include: {
                peminjaman: true,
            }
        });
        if (!pengembalian) {
            throw new NotFoundException(
                `Pengembalian Buku with ID ${id_pengembalian} not found`,
            );
        }
        return pengembalian;
    }

    async update(id_pengembalian: number, dto: UpdatePengembalianBukuDto) {
        await this.findOne(id_pengembalian); // Ensure pengembalian exists
        return this.prisma.pengembalian_Buku.update({
            where: { id_pengembalian },
            data: dto,
        });
    }
}