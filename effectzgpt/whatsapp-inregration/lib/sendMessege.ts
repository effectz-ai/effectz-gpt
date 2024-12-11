import {messageTemplate} from "../types/type";
import 'dotenv/config'
import axios from "axios";
import {getEffectzResponse} from "../src/services/getEffectzRes";

export async function sendMessage(message:string,to:string,messageOption:string, name:string) {
    const url = `https://graph.facebook.com/v${process.env.CLOUD_API_VERSION!}/${process.env.WHATSAPP_PHONE_NUMBER_ID!}/messages`;
    console.info(url)

    const greetPayload:messageTemplate = {
        messaging_product:'whatsapp',
        to:to,
        type:'template',
        template:{
            namespace:`${process.env.NAMESPACE}`,
            name: 'hello',
            language:{
                code: "en_US"
            },
            components:[
                {
                    type:'header',
                    parameters:[
                        {
                            type:'image',
                            image:{
                                link:"https://www.kingshospital.lk/images/logo.png"
                            }
                        }
                    ]
                }
            ]
        }
    }
    const servicesPayload:messageTemplate = {
        messaging_product:'whatsapp',
        to:to,
        type:'template',
        template:{
            namespace:`${process.env.NAMESPACE}`,
            name: 'services',
            language:{
                code: "en_US"
            },
            components:[
                {
                    type:'header',
                    parameters:[
                        {
                            type:'image',
                            image:{
                                link:"https://www.kingshospital.lk/images/logo.png"
                            }
                        }
                    ]
                }
            ]
        }
    }
    const contactPayload:messageTemplate = {
        messaging_product:'whatsapp',
        to:to,
        type:'template',
        template:{
            namespace:`${process.env.NAMESPACE}`,
            name: 'contact_us',
            language:{
                code: "en_US"
            },
            components:[
                {
                    type:'header',
                    parameters:[{
                        type:'image',
                        image:{
                            link:"https://www.kingshospital.lk/images/logo.png"
                        }
                    }]
                }
            ]

        }
    }


    let payload = {}
    switch (messageOption){
        case 'HELLO':
            payload = greetPayload;
            break;
        case 'CHATBOT':
            const effectzResponse = await getEffectzResponse(message);
            payload = {
                messaging_product: 'whatsapp',
                to: to, // Reply to the same phone number that sent the message
                text: {body: effectzResponse},
            }
            break;
        case 'TERMINATE':
            payload = {
                messaging_product: 'whatsapp',
                to: to,
                text: {body: "Thank you, Chat terminated"}
            }
            break;
        case 'SERVICES':
            payload = servicesPayload;
            break;
        case 'CONTACT':
            payload = contactPayload;
            break;
        default:
            payload = greetPayload;
            break;
    }

    const headers = {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN!}`,
        "Content-Type": 'application/json'
    }

    const response = await axios.post(
        url,
        payload,
        {
            headers:headers
        }
    )

    console.log(response)
}