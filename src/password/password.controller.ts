import { Body, Controller, Post } from '@nestjs/common';
import {
    PasswordExceptionModel,
    PasswordOptionsModel,
    PasswordResponseModel
} from './models';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
    constructor(private readonly service: PasswordService) {}

    @Post('new_password')
    generatePassword(
        @Body() options: PasswordOptionsModel
    ): PasswordResponseModel | PasswordExceptionModel {
        return this.service.generatePassword(options);
    }
}
