import axios from 'axios';
import 'dotenv/config';
import { templateBodyParam, templateHeaderParam } from '../types/types';

interface WhatsappServiceConfig {
    apiVersion: string;
    accessToken: string;
    botPhoneNumberId: string;
}
export class WhatsappService {
    private baseUrl:string;
    private token:string;
    private botPhoneId :string;

    constructor(config:WhatsappServiceConfig){
        const {apiVersion, accessToken, botPhoneNumberId} = config;
        this.baseUrl = `https://graph.facebook.com/v${apiVersion}/`;
        this.token = accessToken || '';
        this.botPhoneId = botPhoneNumberId || '';
    }

    private buildUrl(endpoint:string):string{
        return `${this.baseUrl}${endpoint}`
    }

    private setHeaders(){
        return {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": 'application/json'
        }
    }

    async sendText(to:string, text:string){
        if(!this.botPhoneId){
            throw new Error('Phone number ID is not defined');
        }
        if(!this.token){
            throw new Error('WhatsApp access token is not defined');
        }
        try {
            const url = this.buildUrl(`${this.botPhoneId}/messages`)
            const response = await axios.post(url,
                {
                    messaging_product: 'whatsapp',
                    recipient_type: "individual",
                    to: to,
                    type: "text",
                    text: {
                        body: `Hello! I am a bot. I received your message: ${text}`
                    }
                },
                {
                    headers:this.setHeaders()
                }
            )
            return response
        } catch (error) {
            console.error(error)
            throw new Error('Failed to send message')
        }
    }

    async markAsRead(messageId: string) {
        if (!this.botPhoneId) {
            throw new Error('Phone number ID is not defined');
        }
        if (!this.token) {
            throw new Error('WhatsApp access token is not defined');
        }
        try {
            const url = this.buildUrl(`${this.botPhoneId}/messages`);
            const response = await axios.post(
                url,
                {
                    messaging_product: 'whatsapp',
                    status: 'read',
                    message_id: messageId
                },
                {
                    headers: this.setHeaders()
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to mark message as read');
        }
    }

    async sendTemplate(to:string, templateName:string, languageCode:string = 'en_US', headerParam?:templateHeaderParam, templateBodyParams?:Array<templateBodyParam>){
        if (!this.botPhoneId) {
            throw new Error('Phone number ID is not defined');
        }
        if (!this.token) {
            throw new Error('WhatsApp access token is not defined');
        }
        try {
            const url = this.buildUrl(`${this.botPhoneId}/messages`);
            const response = await axios.post(
                url,
                {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to: to,
                    type: 'template',
                    template: {
                        name: templateName,
                        language: {
                            code: languageCode
                        },
                        components: [
                            {
                                type: 'header',
                                parameters: [
                                    headerParam
                                ]
                            }
                            
                        ]
                    }
                },
                {
                    headers: this.setHeaders()
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to send template message');
        }
    }
}

