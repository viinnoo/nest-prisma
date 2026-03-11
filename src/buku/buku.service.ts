import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBukuDto } from './dto/create-buku.dto';
import { UpdateBukuDto } from './dto/update-buku.dto';

@Injectable()
export class BukuService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateBukuDto) {
        return this.prisma.buku.create({ data:dto });
    }

    async findAll() {
        return this.prisma.buku.findMany({orderBy: {id: 'desc'}});
    }

    async findById(id: number) {
        const buku = await this.prisma.buku.findUnique({ where: { id } });
        if (!buku) {
            throw new NotFoundException(`Buku with ID ${id} not found`);
        }
        return buku;
    }

    async findByJudul(judul: string) {
        return this.prisma.buku.findMany({where: {judul: {contains: judul}}});
    }

    async update(id: number, dto: UpdateBukuDto) {
        await this.findById(id); // Ensure buku exists
        return this.prisma.buku.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: number) {
        await this.findById(id); // Ensure buku exists
        return this.prisma.buku.delete({ where: { id } });
    }
}
