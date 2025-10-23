import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';
export * from './assignments/dto/assignments.dto';

export const links = {
    dto: {
        CreateLinkDto,
        UpdateLinkDto,
    },
};