import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Cost } from './cost.model';
import { Costs } from './costs.entity';
import { Between, getConnection, getManager, LessThan, MoreThan, SelectQueryBuilder } from 'typeorm';
import { AuthInterceptor } from '../auth.interceptor';

@Controller('costs')
// @UseInterceptors(AuthInterceptor)
export class CostsController {
  @Post('add')
  async create(@Body() cost: Cost): Promise<any> {
    const newCost = new Costs();

    newCost.date = cost.date ? cost.date : new Date();
    newCost.flat = cost.flat;
    newCost.kindergarten = cost.kindergarten;
    newCost.food = cost.food;
    newCost.dress = cost.dress;
    newCost.medicine = cost.medicine;
    newCost.toys = cost.toys;
    newCost.other = cost.other;
    newCost.comment = cost.comment;

    return newCost.save();
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() cost: Cost) {
    const costToUpdate = await Costs.findOne(Number(id));

    costToUpdate.date = cost.date;
    costToUpdate.flat = cost.flat;
    costToUpdate.food = cost.food;
    costToUpdate.kindergarten = cost.kindergarten;
    costToUpdate.dress = cost.dress;
    costToUpdate.medicine = cost.medicine;
    costToUpdate.toys = cost.toys;
    costToUpdate.other = cost.other;
    costToUpdate.comment = cost.comment;

    console.log(costToUpdate);
    return costToUpdate.save();
  }

  @Get(':year/:month')
  async findAll(@Param('year') year: string, @Param('month') month: string) {

    const fromDate = new Date(Number(year), Number(month) - 1);
    const toDate = new Date(Number(year), Number(month));

    return await getManager()
      .createQueryBuilder(Costs, 'cost')
      .where('cost.date >= :from', { from: fromDate })
      .andWhere('cost.date < :to', { to: toDate })
      .orderBy('cost.date')
      .getMany();
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return await Costs.delete(Number(id));
  }
}
