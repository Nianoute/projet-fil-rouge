import { Module } from '@nestjs/common';
import { BoxService } from './box.service';
import { BoxController } from './box.controller';
import { BoxEntity } from 'src/box/entities/box.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({  
  imports: [
  TypeOrmModule.forFeature([BoxEntity])
],
  controllers: [BoxController],
  providers: [BoxService]
})
export class BoxModule {}
