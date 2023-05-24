import { PartialType } from '@nestjs/mapped-types';
import { CreatePostVariantDto } from './create-post-variant.dto';

export class UpdatePostVariantDto extends PartialType(CreatePostVariantDto) {}
