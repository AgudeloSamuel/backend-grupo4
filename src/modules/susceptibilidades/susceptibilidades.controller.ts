import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SusceptibilidadesService } from './susceptibilidades.service';
import { CreateSusceptibilidadDto } from './dto/create-susceptibilidad.dto';
import { UpdateSusceptibilidadDto } from './dto/update-susceptibilidad.dto';

@Controller('susceptibilidades')
export class SusceptibilidadesController {
  constructor(private readonly susceptibilidadesService: SusceptibilidadesService) {}

  @Post()
  create(@Body() createDto: CreateSusceptibilidadDto) {
    return this.susceptibilidadesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.susceptibilidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.susceptibilidadesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSusceptibilidadDto,
  ) {
    return this.susceptibilidadesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.susceptibilidadesService.remove(id);
  }
}