import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PlantasService } from './plantas.service.js';
import { CreatePlantaDto } from './dto/create-planta.dto.js';
import { UpdatePlantaDto } from './dto/update-planta.dto.js';
import { validarSecuencia } from '../../common/validaciones.js';

@ApiTags('Plantas')
@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  private validarFormato(datos: CreatePlantaDto | UpdatePlantaDto, esActualizacion = false) {
    const errores: string[] = [];
    const tiposPermitidos = ['hortaliza', 'frutal', 'cereal', 'ornamental', 'otro'];

    if (esActualizacion && Object.keys(datos).length === 0) {
      errores.push('El cuerpo de la petición (body) no puede estar vacío en un PATCH.');
    }

    if (!esActualizacion || datos.nombreComun !== undefined) {
      if (!datos.nombreComun || typeof datos.nombreComun !== 'string' || datos.nombreComun.trim() === '') {
        errores.push('El campo nombreComun es obligatorio y no puede estar vacío.');
      }
    }
    
    if (!esActualizacion || datos.nombreCientifico !== undefined) {
      if (!datos.nombreCientifico || typeof datos.nombreCientifico !== 'string' || datos.nombreCientifico.trim() === '') {
        errores.push('El campo nombreCientifico es obligatorio y no puede estar vacío.');
      }
    }

    if (!esActualizacion || datos.familiaBotanica !== undefined) {
      if (!datos.familiaBotanica || typeof datos.familiaBotanica !== 'string' || datos.familiaBotanica.trim() === '') {
        errores.push('El campo familiaBotanica es obligatorio y no puede estar vacío.');
      }
    }

    if (!esActualizacion || datos.tipoCultivo !== undefined) {
      if (!datos.secuenciaGenetica || !validarSecuencia(datos.secuenciaGenetica as string)) {
        errores.push(`El campo tipoCultivo debe ser uno de: ${tiposPermitidos.join(', ')}.`);
      }
    }

    if (!esActualizacion || datos.secuenciaGenetica !== undefined) {
      // Ajusta la llamada a validarSecuenciaGenetica según como la construiste en common/validaciones.ts
      if (!datos.secuenciaGenetica || !validarSecuencia(datos.secuenciaGenetica)) {
        errores.push('El campo secuenciaGenetica es obligatorio, solo puede contener las letras A, C, G, T en mayúscula y no puede estar vacío.');
      }
    }

    if (errores.length > 0) {
      throw new BadRequestException(errores);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva especie de planta' })
  @ApiResponse({ status: 201, description: 'Planta creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error de formato en los campos enviados.' })
  @ApiResponse({ status: 409, description: 'El nombre científico ya se encuentra registrado.' })
  create(@Body() createPlantaDto: CreatePlantaDto) {
    this.validarFormato(createPlantaDto);
    return this.plantasService.create(createPlantaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar plantas con filtros' })
  @ApiQuery({ name: 'tipoCultivo', required: false, description: 'Filtrar por hortaliza, frutal, cereal, ornamental, otro' })
  @ApiQuery({ name: 'familiaBotanica', required: false })
  @ApiQuery({ name: 'nombre', required: false, description: 'Filtrar parcialmente por nombre común' })
  @ApiResponse({ status: 200, description: 'Lista de plantas consultada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Un parámetro de filtro es inválido.' })
  findAll(
    @Query('tipoCultivo') tipoCultivo?: string,
    @Query('familiaBotanica') familiaBotanica?: string,
    @Query('nombre') nombre?: string,
  ) {
    if (tipoCultivo && !['hortaliza', 'frutal', 'cereal', 'ornamental', 'otro'].includes(tipoCultivo)) {
      throw new BadRequestException(['El campo tipoCultivo debe ser uno de: hortaliza, frutal, cereal, ornamental, otro.']);
    }
    return this.plantasService.findAll({ tipoCultivo, familiaBotanica, nombre });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar una planta específica' })
  @ApiResponse({ status: 200, description: 'Planta consultada exitosamente.' })
  @ApiResponse({ status: 400, description: 'El ID proporcionado no es numérico.' })
  @ApiResponse({ status: 404, description: 'No existe el registro.' })
  findOne(@Param('id') id: string) {
    const idEntero = parseInt(id, 10);
    if (isNaN(idEntero) || idEntero <= 0) {
      throw new BadRequestException(['El id debe ser un número entero positivo.']);
    }
    return this.plantasService.findOne(idEntero);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar parcialmente una planta' })
  @ApiResponse({ status: 200, description: 'Planta modificada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Body vacío, formato inválido, o ID no numérico.' })
  @ApiResponse({ status: 404, description: 'No existe el registro.' })
  @ApiResponse({ status: 409, description: 'El nombre científico ya se encuentra registrado.' })
  update(@Param('id') id: string, @Body() updatePlantaDto: UpdatePlantaDto) {
    const idEntero = parseInt(id, 10);
    if (isNaN(idEntero) || idEntero <= 0) {
      throw new BadRequestException(['El id debe ser un número entero positivo.']);
    }
    this.validarFormato(updatePlantaDto, true);
    return this.plantasService.update(idEntero, updatePlantaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una planta' })
  @ApiResponse({ status: 200, description: 'Planta eliminada exitosamente (mensaje de confirmación).' })
  @ApiResponse({ status: 400, description: 'El ID proporcionado no es numérico.' })
  @ApiResponse({ status: 404, description: 'No existe el registro.' })
  @ApiResponse({ status: 409, description: 'La planta no se puede borrar (reglas de la etapa 6).' })
  remove(@Param('id') id: string) {
    const idEntero = parseInt(id, 10);
    if (isNaN(idEntero) || idEntero <= 0) {
      throw new BadRequestException(['El id debe ser un número entero positivo.']);
    }
    return this.plantasService.remove(idEntero);
  }
}