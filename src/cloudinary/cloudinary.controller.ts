import {Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CloudinaryService} from "./cloudinary.service";
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {UserService} from "../user/user.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('/api/cloudinary')
@ApiTags('Cloudinary')
export class CloudinaryController {

    private cloudinaryService : CloudinaryService;
    private userService : UserService;

    constructor(cloudinaryService: CloudinaryService,userService: UserService) {
        this.cloudinaryService = cloudinaryService;
        this.userService = userService;
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File Upload',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File,@Req() req : any) : Promise<object> {
        const result = await this.cloudinaryService.uploadFile(file);
        await this.userService.updateavatar(req.user,result['url']);
        return { avatar :result['url']};
    }


}
