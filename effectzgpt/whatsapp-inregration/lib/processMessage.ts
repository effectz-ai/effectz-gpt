import {extractString} from "./extractString";
import {sendMessage} from "./sendMessege";

function search(pattern:string,text:string):boolean {
    const regex = new RegExp(pattern);
    return regex.test(text);
}

export async function processMessage(message:string, to:string, name:string){
    const userPrompt = extractString(message);
    if (userPrompt == "no"){
        await sendMessage(userPrompt,to,"TERMINATE",name);
    }else{
        if(search("service",userPrompt)){
           await sendMessage(userPrompt,to,"SERVICES",name);
        }else if(search("help|contact|reach|email|problem|issue|more|information",userPrompt)){
            await sendMessage(userPrompt,to,"CONTACT",name)
        }else if(search("hello|hi|greetings",userPrompt)){
            if(search("this",userPrompt)){
                await sendMessage(userPrompt,to,"CHATBOT",name)
            }else{
                await sendMessage(userPrompt,to,"HELLO",name)
            }
        }else{
            await sendMessage(userPrompt,to,"CHATBOT",name)
        }
    }
}