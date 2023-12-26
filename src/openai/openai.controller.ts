import {Controller, Get} from '@nestjs/common';
import {OpenaiService} from "./openai.service";

@Controller('api/openai')
export class OpenaiController {

    private openaiService: OpenaiService;
    constructor(openaiService: OpenaiService) {
        this.openaiService = openaiService;
    }

     @Get("test")
     async demo(): Promise<void> {
       await this.openaiService.test();
    }

}
