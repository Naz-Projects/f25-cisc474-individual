import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Profile } from '@repo/database';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Profile[]> {
        return this.prisma.profile.findMany();
    }


    async findOne(id: string): Promise<Profile | null> {
        return this.prisma.profile.findUnique({
            where: { id },  
        });
    }
}
