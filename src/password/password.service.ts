import { Injectable } from '@nestjs/common';
import {
    PasswordExceptionModel,
    PasswordOptionsModel,
    PasswordResponseModel
} from './models';

@Injectable()
export class PasswordService {
    private static lowercase = 'abcdefghijklmnopqrstuvwxyz';
    private static uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private static numbers = '123456789';
    private static special = '`~!@#$%^&*())=_-+=.,';

    generatePassword(
        options: PasswordOptionsModel
    ): PasswordResponseModel | PasswordExceptionModel {
        if (options.length < 8) {
            return {
                error:
                    'Password is too short, should be at least 8 characters long'
            } as PasswordExceptionModel;
        }

        const passwordLength = options.length;
        const charset = this.formCharset(
            options?.uppercase ?? false,
            options?.numbers ?? false,
            options?.specials ?? false
        );
        const indices = this.indicesOfRandomCharacters(
            charset.length,
            passwordLength
        );

        const password = this.generatePasswordImpl(charset, indices);
        if (password != null) {
            let score = 0;
            if (passwordLength > 10) score++;
            if (options.uppercase) score++;
            if (options.numbers) score++;
            if (options.specials) score++;

            return {
                length: options.length,
                security: score,
                password: password
            } as PasswordResponseModel;
        } else {
            return {
                error: 'Invalid options'
            } as PasswordExceptionModel;
        }
    }

    private formCharset(
        hasUppercase: boolean,
        hasNumbers: boolean,
        hasSpecials: boolean
    ): string {
        let characterSet = PasswordService.lowercase;
        if (hasUppercase) characterSet += PasswordService.uppercase;
        if (hasNumbers) characterSet += PasswordService.numbers;
        if (hasSpecials) characterSet += PasswordService.special;
        return characterSet;
    }

    private indicesOfRandomCharacters(
        charsetLength: number,
        passwordLength: number
    ): Array<number> {
        if (charsetLength <= 0 || passwordLength <= 0) {
            return [];
        }

        const indices: Array<number> = [];
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = this.getRandomInt(0, charsetLength);
            indices.push(randomIndex);
        }
        return indices;
    }

    private generatePasswordImpl(
        charset: string,
        indices: Array<number>
    ): string | null {
        if (charset.length <= 0 || indices.length === 0) {
            return null;
        }

        const charsetList = charset.split('');
        let password = '';
        indices.forEach((index) => (password += charsetList[index]));
        return password;
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
