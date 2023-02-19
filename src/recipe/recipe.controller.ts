import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    @Get()
    getAll(){
        return this.recipeService.findAll();
    }

    @Get(':id')
    getOne(
        @Param('id') id: number,
    ){
        return this.recipeService.findOne(id);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number,
    ){
        return this.recipeService.delete(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() recipe,
    ){
        return this.recipeService.update(id, recipe);
    }

    @Post()
    create(
        @Body() recipe
    ){
        return this.recipeService.create(recipe);
    }

    // @Delete(':id')
}
