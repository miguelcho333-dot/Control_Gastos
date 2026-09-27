import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InyeccionesService } from './inyecciones.service';
import { CreateInyeccioneDto } from './dto/create-inyeccione.dto';
import { UpdateInyeccioneDto } from './dto/update-inyeccione.dto';

@Controller('inyecciones')
export class InyeccionesController {
  constructor(private readonly inyeccionesService: InyeccionesService) {}

  @Post()
  create(@Body() createInyeccioneDto: CreateInyeccioneDto) {
    return this.inyeccionesService.create(createInyeccioneDto);
  }

  @Get()
  findAll() {
    return this.inyeccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inyeccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInyeccioneDto: UpdateInyeccioneDto) {
    return this.inyeccionesService.update(+id, updateInyeccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inyeccionesService.remove(+id);
  }
}
