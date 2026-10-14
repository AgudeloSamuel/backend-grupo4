import { Module } from '@nestjs/common';
import { PlantasService } from './plantas.service.js';
import { PlantasController } from './plantas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planta } from './entities/planta.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Planta])],
  controllers: [PlantasController],
  providers: [PlantasService],
})
export class PlantasModule {}