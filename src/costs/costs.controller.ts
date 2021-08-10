import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Cost } from './cost.model';
import { Costs } from './costs.entity';
import { Between } from 'typeorm';

@Controller('costs')
export class CostsController {
  @Post()
  async create(@Body() cost: Cost): Promise<any> {
    const newCost = new Costs();

    newCost.date = new Date();
    newCost.amount = cost.amount;
    newCost.comment = cost?.comment;
    newCost.category = cost.category;

    return newCost.save();
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() cost: Cost) {
    const costToUpdate = await Costs.findOne(Number(id));

    costToUpdate.date = cost.date;
    costToUpdate.amount = cost.amount;
    costToUpdate.comment = cost.comment;
    costToUpdate.category = cost.category;

    console.log(costToUpdate);
    return costToUpdate.save();
  }

  @Get(':year/:month')
  async findAll(@Param('year') year: string, @Param('month') month: string): Promise<Costs[]> {
    const fromDate = new Date(`${year}-${month}`);
    let toDate = new Date(fromDate.getTime());
    toDate = new Date(toDate.setMonth(fromDate.getMonth() + 1));
    return await Costs.find({
      date: Between(fromDate, toDate),
    });
  }
}
