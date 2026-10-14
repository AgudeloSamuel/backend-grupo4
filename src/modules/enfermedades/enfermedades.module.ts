import { Module } from '@nestjs/common';
import { EnfermedadesController } from './enfermedades.controller.js';
import { EnfermedadesService } from './enfermedades.service.js';

@Module({
  controllers: [EnfermedadesController],
  providers: [EnfermedadesService]
})
export class EnfermedadesModule {}
