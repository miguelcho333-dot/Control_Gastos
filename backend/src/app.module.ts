import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { GastosModule } from './gastos/gastos.module';
import { PrismaModule } from './prisma/prisma.module';
import { InyeccionesModule } from './inyecciones/inyecciones.module';
import { CierresModule } from './cierres/cierres.module';

@Module({
  imports: [PrismaModule, GastosModule, InyeccionesModule, CierresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
