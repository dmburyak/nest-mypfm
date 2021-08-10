import { Body, Controller, Post } from '@nestjs/common';
import { Cost } from './cost.model';
import { Costs } from './costs.entity';

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
}
