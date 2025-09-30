import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@repo/database';

interface makeUserDto {
    email: String,
    name: String,
}  

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
}


    async findOne(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },  
        });
    }
}
