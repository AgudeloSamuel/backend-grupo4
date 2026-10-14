import { Module } from '@nestjs/common';
import { SusceptibilidadesService } from './susceptibilidades.service.js';
import { SusceptibilidadesController } from './susceptibilidades.controller.js';

@Module({
  controllers: [SusceptibilidadesController],
  providers: [SusceptibilidadesService],
})
export class SusceptibilidadesModule {}
