import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export enum NivelSusceptibilidad{
    BAJA = 'baja',
    MEDIA = 'media',
    ALTA = 'alta',
}

export class CreateSusceptibilidadDto{
    @IsInt({ message: 'El id de la planta debe ser un número entero'})
    @IsNotEmpty({ message: 'El id de la planta es obligatorio'})
    plantaId: number;

    @IsInt({ message: 'El id de la enfermedad debe ser un número entero'})
    @IsNotEmpty({ message: 'El id de la enfermedad es obligatorio'})
    enfermedadId: number;
    
    @IsEnum(NivelSusceptibilidad, {
      message: ' El nivel debe ser uno de los valores permitidos: baja, media, alta',
    })

    @IsNotEmpty({ message: 'El nivel de susceptibilidad es obligatorio'})
    nivel: NivelSusceptibilidad;
}
