import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CloudinaryService} from "./cloudinary.service";

@Controller('/api/cloudinary')
export class CloudinaryController {

    private cloudinaryService : CloudinaryService;

    constructor(cloudinaryService: CloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
   async uploadImage(@UploadedFile() file: Express.Multer.File) : Promise<object> {
        return  this.cloudinaryService.uploadFile(file);
    }
}
