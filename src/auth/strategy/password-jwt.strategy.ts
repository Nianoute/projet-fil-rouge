import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
            expiresIn: 10,
        });
    }

    async validate(payload: any) {
        const { email } = payload;

        if (!email) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        // Supprimez le mot de passe de l'objet utilisateur
        delete user.password;

        return user;
    }
}