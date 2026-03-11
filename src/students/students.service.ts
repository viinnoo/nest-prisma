import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateStudentDto) {
        return this.prisma.student.create({ data:dto });
    }

    async findAll() {
        return this.prisma.student.findMany({orderBy: {id: 'asc'}});
    }

    async findOne(nis: string) {
        const student = await this.prisma.student.findFirst({ where: { nis } });
        if (!student) {
            throw new NotFoundException(`Student with NIS ${nis} not found`);
        }
        return student;
    }

    async findById(id: number) {
        const student = await this.prisma.student.findUnique({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }

    async findByName(name: string) {
        return this.prisma.student.findMany({where: {name: {contains: name}}});
    }

    async update(nis: string, dto: UpdateStudentDto) {
        await this.findOne(nis); // Ensure student exists
        return this.prisma.student.update({
            where: {nis},
            data: dto,
        });
    }

    async updateById(id: number, dto: UpdateStudentDto) {
        await this.findById(id); // Ensure student exists
        return this.prisma.student.update({
            where: {id},
            data: dto,
        });
    }

    async remove(nis: string) {
        await this.findOne(nis); // Ensure student exists
        return this.prisma.student.delete({ where: { nis } });
    }

    async removeById(id: number) {
        await this.findById(id); // Ensure student exists
        return this.prisma.student.delete({ where: { id } });
    }
}
