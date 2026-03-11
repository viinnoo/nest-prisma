import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
      PassportModule,

      JwtModule.registerAsync({
        useFactory: () => ({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      }),
  ],

  controllers: [AuthController],

  providers: [
      AuthService,
      PrismaService,
      JwtStrategy,
  ],

  exports: [AuthService],
})
export class AuthModule {}
