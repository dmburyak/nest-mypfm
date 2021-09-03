import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Cost } from './cost.model';
import { Costs } from './costs.entity';
import { Between } from 'typeorm';
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
  async findAll(
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<Costs[]> {
    const fromDate = new Date(`${year}-${month}`);
    let toDate = new Date(fromDate.getTime());
    toDate = new Date(toDate.setMonth(fromDate.getMonth() + 1));
    return await Costs.find({
      where: [{ date: Between(fromDate, toDate) }],
      order: { date: 'ASC' },
    });
  }
}
