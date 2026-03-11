import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client/wasm';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new student (Only for Admin)' })
    @Post()                 
    create(@Body() dto: CreateStudentDto) {
        return this.studentsService.create(dto);
    }

    @ApiOperation({ summary: 'Get all students' })
    @Get()
    findAll() {
        return this.studentsService.findAll();
    }

    @ApiOperation({ summary: 'Get a student by NIS' })
    @Get('nis/:nis')
    findOne(@Param('nis') nis: string) {
        return this.studentsService.findOne(String(nis));
    }

    @ApiOperation({ summary: 'Get a student by ID' })
    @Get('id/:id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.studentsService.findById(Number(id));
    }

    @ApiOperation({ summary: 'Get a student by name' })
    @Get('name/:name')
    findByName(@Param('name') name: string) {
        return this.studentsService.findByName(name);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update a student by NIS (Only for Admin)' })
    @Put('nis/:nis')
    update(@Param('nis') nis: string, @Body() dto: UpdateStudentDto) {
        return this.studentsService.update(String(nis), dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update a student by ID (Only for Admin)' })
    @Put('id/:id')
    updateById(@Param('id') id: number, @Body() dto: UpdateStudentDto) {
        return this.studentsService.updateById(Number(id), dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete a student by NIS (Only for Admin)' })
    @Delete('nis/:nis')
    remove(@Param('nis') nis: string) {
        return this.studentsService.remove(String(nis));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete a student by ID (Only for Admin)' })
    @Delete('id/:id')
    removeById(@Param('id') id: number) {
        return this.studentsService.removeById(Number(id));
    }
}