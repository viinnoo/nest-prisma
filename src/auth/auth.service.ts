import { Injectable, UnauthorizedException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
        where: { username },
        include: { student: true },
    });

    if (!user) {
        throw new UnauthorizedException('Invalid username or password');
    }

const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
    };

    return {
        success: true,
        message: 'Login successful',
        accessToken: this.jwtService.sign(payload),
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
        },
    };
  }

async register( username: string, password: string, role: UserRole, studentId?: number, ) {

    if (role === 'STUDENT' && !studentId) {
        throw new BadRequestException('Student ID is required for STUDENT role');
    }

    if (studentId) {
        const student = await this.prisma.student.findUnique({
        where: { id: studentId },
    });

    if (!student) {
        throw new BadRequestException('Student not found');
    }
}

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = await this.prisma.user.create({
    data: {
        username,
        password: hashedPassword,
        role,
        id_student: studentId ? studentId : null,
    },
    include: { student: true },
});

    return {
        message: 'User registered successfully',
        user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        student: newUser.student,
        createdAt: newUser.createdAt,
        },
    };
  }
}
