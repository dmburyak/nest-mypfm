import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Category } from './category.model';
import { Categories } from './categories.entity';
import { AuthInterceptor } from '../auth.interceptor';

@Controller('categories')
// @UseInterceptors(AuthInterceptor)
export class CategoriesController {
  @Post()
  async create(@Body() category: Category): Promise<Categories> {
    const newCategory = new Categories();
    newCategory.name = category.name;
    newCategory.nameRu = category.nameRu;
    newCategory.color = category.color;
    return await newCategory.save();
  }

  @Get()
  async findAll(): Promise<any> {
    return await Categories.find();
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() category: Category) {
    const categoryToUpdate = await Categories.findOne(Number(id));
    categoryToUpdate.name = category.name;
    categoryToUpdate.nameRu = category.nameRu;
    categoryToUpdate.color = category.color;
    console.log(categoryToUpdate);
    return categoryToUpdate.save();
  }
}
