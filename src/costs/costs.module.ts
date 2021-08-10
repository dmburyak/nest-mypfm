import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costs } from './costs.entity';
import { CostsController } from './costs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Costs])],
  controllers: [CostsController],
})
export class CostsModule {}
