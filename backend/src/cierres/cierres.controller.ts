import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CierresService } from './cierres.service';
import { CreateCierreDto } from './dto/create-cierre.dto';
import { UpdateCierreDto } from './dto/update-cierre.dto';

@Controller('cierres')
export class CierresController {
  constructor(private readonly cierresService: CierresService) { }

  @Post()
  create(@Body() createCierreDto: CreateCierreDto) {
    return this.cierresService.create(createCierreDto);
  }

  @Get()
  findAll() {
    return this.cierresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cierresService.findOne(+id);
  }
}
