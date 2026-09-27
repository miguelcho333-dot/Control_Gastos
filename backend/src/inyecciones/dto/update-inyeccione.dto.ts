import { PartialType } from '@nestjs/mapped-types';
import { CreateInyeccioneDto } from './create-inyeccione.dto';

export class UpdateInyeccioneDto extends PartialType(CreateInyeccioneDto) {}
