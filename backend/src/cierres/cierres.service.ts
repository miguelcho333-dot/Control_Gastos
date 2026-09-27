import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCierreDto } from './dto/create-cierre.dto';
import { UpdateCierreDto } from './dto/update-cierre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CierresService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createCierreDto: CreateCierreDto) {
    const {
      fecha_operativa,
      base_inicial,
      efectivo_fisico,
      dinero_digital = 0,
      base_siguiente_dia,
    } = createCierreDto;

    const dineroTotal = efectivo_fisico + dinero_digital;

    // 1. Buscar gastos sueltos (cierre_id: null)
    const gastosSueltos = await this.prisma.gastos.findMany({
      where: { cierre_id: null },
    });
    const totalGastos = gastosSueltos.reduce((suma, g) => suma + Number(g.monto), 0);

    // 2. Buscar inyecciones sueltas (cierre_id: null)
    const inyeccionesSueltas = await this.prisma.inyecciones.findMany({
      where: { cierre_id: null },
    });
    const totalInyecciones = inyeccionesSueltas.reduce((suma, i) => suma + Number(i.monto), 0);

    // 3. Buscar el colchón del último cierre
    const ultimoCierre = await this.prisma.cierres_diarios.findFirst({
      orderBy: { fecha_operativa: 'desc' },
    });
    const colchonAnterior = ultimoCierre ? Number(ultimoCierre.colchon_resultante) : 0;

    // 4. Aplicar las dos fórmulas matemáticas centrales
    const ventasCalculadas = dineroTotal - base_inicial + totalGastos - totalInyecciones;
    const colchonResultante = colchonAnterior - totalInyecciones + (dineroTotal - base_siguiente_dia);

    // 5. Transacción Atómica (ACID): O se guarda todo o no se guarda nada
    return await this.prisma.$transaction(async (tx) => {
      // A. Crear el registro del cierre diario
      const nuevoCierre = await tx.cierres_diarios.create({
        data: {
          fecha_operativa: new Date(fecha_operativa),
          base_inicial,
          efectivo_fisico,
          dinero_digital,
          base_siguiente_dia,
          total_gastos: totalGastos,
          total_inyecciones: totalInyecciones,
          ventas_calculadas: ventasCalculadas,
          colchon_resultante: colchonResultante,
        },
      });

      // B. Sellar los gastos sueltos vinculándolos a este cierre
      await tx.gastos.updateMany({
        where: { cierre_id: null },
        data: { cierre_id: nuevoCierre.id },
      });

      // C. Sellar las inyecciones sueltas vinculándolas a este cierre
      await tx.inyecciones.updateMany({
        where: { cierre_id: null },
        data: { cierre_id: nuevoCierre.id },
      });

      return nuevoCierre;
    });
  }

  async findAll() {
    return this.prisma.cierres_diarios.findMany({
      orderBy: { fecha_operativa: 'desc' },
      include: {
        gastos: true,
        inyecciones: true,
      },
    });
  }

  async findOne(id: number) {
    const cierre = await this.prisma.cierres_diarios.findUnique({
      where: { id: BigInt(id) },
      include: {
        gastos: true,
        inyecciones: true,
      },
    });

    if (!cierre) {
      throw new NotFoundException(`Cierre con ID #${id} no encontrado`);
    }

    return cierre;
  }

}
