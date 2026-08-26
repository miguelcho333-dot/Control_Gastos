import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { GastosModule } from './gastos/gastos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, GastosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
