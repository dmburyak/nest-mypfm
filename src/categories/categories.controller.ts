import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from './category.model';
import { Categories } from './categories.entity';

@Controller('categories')
export class CategoriesController {
  @Post()
  async create(@Body() category: Category): Promise<Categories> {
    const newCategory = new Categories();
    newCategory.name = category.name;
    newCategory.color = category.color;
    return await newCategory.save();
  }

  @Get()
  async findAll(): Promise<Categories[]> {
    return await Categories.find();
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() category: Category) {
    const categoryToUpdate = await Categories.findOne(Number(id));
    categoryToUpdate.name = category.name;
    categoryToUpdate.color = category.color;
    console.log(categoryToUpdate);
    return categoryToUpdate.save();
  }
}
