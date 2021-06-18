import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { RoomsModule } from './modules/rooms';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), RoomsModule],
})
export class AppModule {}
