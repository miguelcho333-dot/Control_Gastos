import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGastoDto } from './dto/update-gasto.dto';

@Injectable()
export class GastosService {
  // Inyectamos el servicio de base de datos PrismaService
  constructor(private readonly prisma: PrismaService) { }

  // 1. Guardar un nuevo gasto en Supabase
  async create(createGastoDto: CreateGastoDto) {
    return this.prisma.gastos.create({
      data: {
        monto: createGastoDto.monto,
        descripcion: createGastoDto.descripcion,
        metodo_pago: createGastoDto.metodo_pago ?? 'EFECTIVO',
      },
    });
  }

  // 2. Obtener todos los gastos registrados
  async findAll() {
    return this.prisma.gastos.findMany({
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number) {
    const gasto = await this.prisma.gastos.findUnique({
      where: { id: BigInt(id) }
    });

    if (!gasto) {
      throw new NotFoundException(`Gasto con ID #${id} no encontrado `)

    }
    return gasto;
  }

  async update(id: number, updateGastoDto: UpdateGastoDto) {
    return this.prisma.gastos.update({
      where: { id: BigInt(id) },
      data: updateGastoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.gastos.delete({
      where: { id: BigInt(id) }
    });
  }

}
