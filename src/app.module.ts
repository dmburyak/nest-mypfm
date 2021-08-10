import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costs } from './costs/costs.entity';
import { CategoriesModule } from './categories/categories.module';
import { Categories } from './categories/categories.entity';
import { CostsModule } from './costs/costs.module';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '111111',
      database: 'pfm',
      entities: [Categories, Costs, Users],
      synchronize: true,
    }),
    CategoriesModule,
    CostsModule,
    UsersModule,
  ],
})
export class AppModule {}
