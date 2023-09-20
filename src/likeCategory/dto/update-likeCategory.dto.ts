import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryLikeDto } from './create-likeCategory.dto';

export class UpdateCategoryLikeDto extends PartialType(CreateCategoryLikeDto) { }
