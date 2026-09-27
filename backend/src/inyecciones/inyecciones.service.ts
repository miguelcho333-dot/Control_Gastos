import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInyeccioneDto } from './dto/create-inyeccione.dto';
import { UpdateInyeccioneDto } from './dto/update-inyeccione.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InyeccionesService {

  //inyeccion de prisma service a la base de datos
  constructor(private readonly prisma: PrismaService) { }

  async create(createInyeccioneDto: CreateInyeccioneDto) {
    return this.prisma.inyecciones.create({
      data: {
        monto: createInyeccioneDto.monto,
        fuente: createInyeccioneDto.fuente,
        metodo_pago: createInyeccioneDto.metodo_pago ?? 'EFECTIVO'
      },
    });
  }

  async findAll() {
    return this.prisma.inyecciones.findMany({
      orderBy: { fecha: `desc` }
    });
  }

  async findOne(id: number) {
    const inyeccion = await this.prisma.inyecciones.findUnique({
      where: { id: BigInt(id) }
    });

    if (!inyeccion) {
      throw new NotFoundException(`inyeccion con ID #${id} no encontrado `)

    }
    return inyeccion;
  }

  async update(id: number, updateInyeccioneDto: UpdateInyeccioneDto) {
    return this.prisma.inyecciones.update({
      where: { id: BigInt(id) },
      data: updateInyeccioneDto,
    });
  }

  async remove(id: number) {
    return this.prisma.inyecciones.delete({
      where: { id: BigInt(id) }
    });
  }
}
