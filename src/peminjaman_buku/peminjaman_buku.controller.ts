import { Controller, Body, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PeminjamanBukuService } from './peminjaman_buku.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman_buku.dto';
import { UpdatePeminjamanBukuDto } from './dto/update-peminjaman_buku.dto';

@ApiTags('Peminjaman Buku')
@ApiBearerAuth()
@Controller('peminjaman-buku')
export class PeminjamanBukuController {
    constructor(private readonly peminjamanBukuService: PeminjamanBukuService,) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.PETUGAS)
    @ApiOperation({ summary: 'Create a new peminjaman buku (Only for Admin and Petugas)' })
    @Post()
        create(@Body() dto: CreatePeminjamanBukuDto) {
        return this.peminjamanBukuService.create(dto);
    }

    @ApiOperation({ summary: 'Get all peminjaman buku' })
    @Get()
    findAll() {
        return this.peminjamanBukuService.findAll();
    }

    @ApiOperation({ summary: 'Get a peminjaman buku by ID' })
    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.peminjamanBukuService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.PETUGAS)
    @ApiOperation({ summary: 'Update a peminjaman buku by ID (Only for Admin and Petugas)' })
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePeminjamanBukuDto,
    ) {
    return this.peminjamanBukuService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.PETUGAS)
    @ApiOperation({ summary: 'Delete a peminjaman buku by ID (Only for Admin and Petugas)' })
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.peminjamanBukuService.remove(id);
    }
}