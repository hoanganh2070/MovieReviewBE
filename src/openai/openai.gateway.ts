import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Socket} from "socket.io";
import OpenAI from "openai";
import * as process from "process";

@WebSocketGateway({ cors: true })
export class OpenaiGateway{

    @WebSocketServer()
    server : Socket;


    openAi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    @SubscribeMessage('chatbot')
    async handleEvent(@MessageBody() data: string): Promise<void> {

        const stream = this.openAi.beta.chat.completions.stream({
            messages: [{role: "system", content: data }],
            model: "gpt-3.5-turbo",
        });
        stream.on('content', (res) => {
            this.server.emit('chatbot',res);
        });
        if (await stream.finalChatCompletion()){
            this.server.emit('chatbot','\0');
        }
    }

}