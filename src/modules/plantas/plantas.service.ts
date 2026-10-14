import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from './entities/planta.entity.js';
import { CreatePlantaDto } from './dto/create-planta.dto.js';
import { UpdatePlantaDto } from './dto/update-planta.dto.js';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Planta)
    private readonly plantasRepository: Repository<Planta>,
  ) {}

  async create(createPlantaDto: CreatePlantaDto): Promise<Planta> {
    const existe = await this.plantasRepository.findOneBy({
      nombreCientifico: createPlantaDto.nombreCientifico,
    });
    if (existe) {
      throw new ConflictException(`El nombre científico '${createPlantaDto.nombreCientifico}' ya se encuentra registrado.`);
    }

    const nuevaPlanta = this.plantasRepository.create(createPlantaDto);
    return this.plantasRepository.save(nuevaPlanta);
  }

  async findAll(filtros: { tipoCultivo?: string; familiaBotanica?: string; nombre?: string }): Promise<Planta[]> {
    const queryBuilder = this.plantasRepository.createQueryBuilder('planta');

    if (filtros.tipoCultivo) {
      queryBuilder.andWhere('planta.tipoCultivo = :tipoCultivo', { tipoCultivo: filtros.tipoCultivo });
    }
    if (filtros.familiaBotanica) {
      queryBuilder.andWhere('planta.familiaBotanica LIKE :familiaBotanica', { familiaBotanica: `%${filtros.familiaBotanica}%` });
    }
    if (filtros.nombre) {
      queryBuilder.andWhere('planta.nombreComun LIKE :nombre', { nombre: `%${filtros.nombre}%` });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Planta> {
    const planta = await this.plantasRepository.findOneBy({ id });
    if (!planta) {
      throw new NotFoundException(`No existe la planta con id ${id}`);
    }
    return planta;
  }

  async update(id: number, updatePlantaDto: UpdatePlantaDto): Promise<Planta> {
    const planta = await this.findOne(id); // Reutiliza findOne para lanzar el 404 automáticamente

    if (updatePlantaDto.nombreCientifico && updatePlantaDto.nombreCientifico !== planta.nombreCientifico) {
      const existe = await this.plantasRepository.findOneBy({
        nombreCientifico: updatePlantaDto.nombreCientifico,
      });
      if (existe) {
        throw new ConflictException(`El nombre científico '${updatePlantaDto.nombreCientifico}' ya se encuentra registrado.`);
      }
    }

    Object.assign(planta, updatePlantaDto);
    return this.plantasRepository.save(planta);
  }

  async remove(id: number): Promise<{ message: string }> {
    const planta = await this.findOne(id);
    
    // Nota: Las restricciones de borrado de cultivos, brotes y susceptibilidades
    // se implementarán más adelante en la rama feature/restricciones-eliminacion-plantas (Etapa 6).
    await this.plantasRepository.remove(planta);
    
    return { message: `La planta con id ${id} fue eliminada exitosamente.` };
  }
}