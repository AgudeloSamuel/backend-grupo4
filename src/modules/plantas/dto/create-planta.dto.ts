import { ApiProperty } from '@nestjs/swagger';

export class CreatePlantaDto {
  @ApiProperty({ description: 'Nombre común de la planta' })
  nombreComun: string;

  @ApiProperty({ description: 'Nombre científico de la planta (debe ser único)' })
  nombreCientifico: string;

  @ApiProperty({ description: 'Familia botánica a la que pertenece' })
  familiaBotanica: string;

  @ApiProperty({ description: 'Valores permitidos: hortaliza, frutal, cereal, ornamental, otro' })
  tipoCultivo: string;

  @ApiProperty({ description: 'Secuencia de referencia (solo letras A, C, G, T en mayúscula)' })
  secuenciaGenetica: string;
}
