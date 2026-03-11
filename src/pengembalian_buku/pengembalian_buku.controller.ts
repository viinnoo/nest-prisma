import { Controller, Param, Post, Body, Get, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PengembalianBukuService } from './pengembalian_buku.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreatePengembalianBukuDto } from './dto/create-pengembalian_buku.dto';
import { UpdatePengembalianBukuDto } from './dto/update-pengembalian_buku.dto';

@ApiTags('Pengembalian Buku')
@ApiBearerAuth()
@Controller('pengembalian-buku')
export class PengembalianBukuController {
    constructor(private pengembalianBukuService: PengembalianBukuService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.PETUGAS)
    @ApiOperation({ summary: 'Create a new pengembalian buku (Only for Admin and Petugas)' })
    @Post()
    create(@Body() dto: CreatePengembalianBukuDto) {
        return this.pengembalianBukuService.create(dto);
    }

    @ApiOperation({ summary: 'Get all pengembalian buku' })
    @Get()
    findAll() {
        return this.pengembalianBukuService.findAll();
    }

    @ApiOperation({ summary: 'Get a pengembalian buku by ID' })
    @Get(':id_pengembalian')
    findOne(@Param('id_pengembalian', ParseIntPipe) id_pengembalian: number) {
        return this.pengembalianBukuService.findOne(id_pengembalian);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.PETUGAS)
    @ApiOperation({ summary: 'Update a pengembalian buku by ID (Only for Admin and Petugas)' })
    @Put(':id_pengembalian')
    update(
        @Param('id_pengembalian', ParseIntPipe) id_pengembalian: number,
        @Body() dto: UpdatePengembalianBukuDto,
    ) {
        return this.pengembalianBukuService.update(id_pengembalian, dto);
    }
}