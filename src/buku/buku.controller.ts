import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { BukuService } from './buku.service';
import { CreateBukuDto } from './dto/create-buku.dto';
import { UpdateBukuDto } from './dto/update-buku.dto';

@ApiTags('Buku')
@ApiBearerAuth()
@Controller('buku')
    export class BukuController {
        constructor(private bukuService: BukuService) {}

        @UseGuards(JwtAuthGuard, RolesGuard)
        @Roles(UserRole.ADMIN, UserRole.PETUGAS)
        @Post()
        @ApiOperation({ summary: 'Create a new buku (Only for Admin and Petugas)' })
        create(@Body() dto: CreateBukuDto) {
                return this.bukuService.create(dto);
            }

        @Get()
        @ApiOperation({ summary: 'Get all buku' })
            findAll() {
                return this.bukuService.findAll();
            }

        @ApiOperation({ summary: 'Get a buku by ID' })
        @Get('id/:id')
            findOne(@Param('id', ParseIntPipe) id: number) {
                return this.bukuService.findById(id);
            }

        @ApiOperation({ summary: 'Get a buku by title' })
        @Get('judul/:judul')
            findByJudul(@Param('judul') judul: string) {
                return this.bukuService.findByJudul(judul);
            }   

        @UseGuards(JwtAuthGuard, RolesGuard)
        @Roles(UserRole.ADMIN, UserRole.PETUGAS)
        @ApiOperation({ summary: 'Update a buku by ID (Only for Admin and Petugas)' })
        @Put(':id')
            update(@Param('id') id: number, @Body() dto: UpdateBukuDto) {
                return this.bukuService.update(id, dto);
            }

        @UseGuards(JwtAuthGuard, RolesGuard)
        @Roles(UserRole.ADMIN, UserRole.PETUGAS)
        @ApiOperation({ summary: 'Delete a buku by ID (Only for Admin and Petugas)' })
        @Delete(':id')
        remove(@Param('id') id: number) {
            return this.bukuService.remove(id);
        }
}