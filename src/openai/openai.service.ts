import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import * as process from "process";

@Injectable()
export class OpenaiService {
    openAi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    async test(): Promise<void> {
        const stream = this.openAi.beta.chat.completions.stream({
            messages: [{role: "system", content: "tell me about nest js"}],
            model: "gpt-3.5-turbo",
        });

        stream.on('content', (res) => {
            console.log(res);
        });
    }
}
