import { Body, Controller, Post } from '@nestjs/common';
import { Category } from './category.model';
import { Categories } from './categories.entity';

@Controller('categories')
export class CategoriesController {
  @Post()
  async create(@Body() category: Category): Promise<any> {
    const newCategory = new Categories();
    newCategory.name = category.name;
    return newCategory.save();
  }
}
