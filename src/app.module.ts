import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SusceptibilidadesModule } from './susceptibilidades/susceptibilidades.module.js';
import { PatogenosModule } from './modules/patogenos/patogenos.module.js'; 
import { TratamientosModule } from './modules/tratamientos/tratamientos.module.js';
import { EnfermedadesModule } from './modules/enfermedades/enfermedades.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    SusceptibilidadesModule,
    PatogenosModule,
    EnfermedadesModule,
    TratamientosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
