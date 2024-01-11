import { Module } from '@nestjs/common';

import {OpenaiGateway} from "./openai.gateway";

@Module({
  providers: [OpenaiGateway]
})
export class OpenaiModule {

}
