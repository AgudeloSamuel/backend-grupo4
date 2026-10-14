import { PartialType } from '@nestjs/mapped-types';
import { CreateSusceptibilidadDto } from './create-susceptibilidad.dto';

export class UpdateSusceptibilidadDto extends PartialType(CreateSusceptibilidadDto) {}
