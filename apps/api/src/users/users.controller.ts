import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

@Controller('users')
export class UsersController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async me(@CurrentUser() auth: JwtUser) {
        console.log('Current user:', auth);
        if (!auth || !auth.userId) {
            throw new UnauthorizedException();
        }
        const user = await this.usersService.findOne(auth.userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Return only what your client needs
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            role: user.role,
        };
    }
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

}


