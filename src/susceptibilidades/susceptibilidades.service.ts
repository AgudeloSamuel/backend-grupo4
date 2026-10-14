import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSusceptibilidadDto } from './dto/create-susceptibilidad.dto';
import { UpdateSusceptibilidadDto } from './dto/update-susceptibilidad.dto';
import { Susceptibilidad } from './entities/susceptibilidad.entity';

@Injectable()
export class SusceptibilidadesService {
  private susceptibilidades: Susceptibilidad[] = [];
  private idCounter = 1;

  create(createDto: CreateSusceptibilidadDto): Susceptibilidad{
    const nueva: Susceptibilidad = {
      id: this.idCounter++,
      ...createDto,
    };
    this.susceptibilidades.push(nueva);
    return nueva;
  }

  findAll(): Susceptibilidad[]{
    return this.susceptibilidades;
  }

  findOne(id: number): Susceptibilidad{
    const item = this.susceptibilidades.find((s) => s.id === id);
    if (!item){
      throw new NotFoundException(`Susceptibilidad con ID ${id} no encontrada`);
    }
    return item;
  }

  update(id: number, updateDto: UpdateSusceptibilidadDto): Susceptibilidad{
    const item = this.findOne(id);
    Object.assign(item, updateDto);
    return item;
  }

  remove(id: number): void {
    const index = this.susceptibilidades.findIndex((s) => s.id === id);
    if (index === -1){
      throw new NotFoundException(`Susceptibilidad con ID ${id} no encontrada`);
    }
    this.susceptibilidades.splice(index, 1);
  }
  
  }
  