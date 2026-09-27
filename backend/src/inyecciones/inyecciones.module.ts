import { Module } from '@nestjs/common';
import { InyeccionesService } from './inyecciones.service';
import { InyeccionesController } from './inyecciones.controller';

@Module({
  controllers: [InyeccionesController],
  providers: [InyeccionesService],
})
export class InyeccionesModule {}
