import * as jwt from "jsonwebtoken";
import {User} from "../entity/User";

export const jwtToken = (user: User) => {
    const payload = {
        id: user.id,
        nickname: user.nickname,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
}