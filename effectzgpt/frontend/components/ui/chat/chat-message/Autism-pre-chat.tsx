import { useState } from "react";
import { ChatHandler, AutismPreChatData } from "../index";
import {GiAmpleDress, GiCoffeeCup, GiEnergyBreath, GiToothbrush} from "react-icons/gi";

const chat = ["brush teeth","make tea","getting dressed","deep breath"];
export const AutismPreChat = ({append}:{
    append: Pick<ChatHandler, "append">["append"],
}) => {
    return (
        append !== undefined &&(
            <div className="flex flex-col items-center space-y-4 p-4 max-w-sm mx-auto">
            <button
                onClick={() => append({role:'user',content:chat[0]})}
                className="w-full flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
                <GiToothbrush size={50}/>
            </button>

            <button
                onClick={() => append({role:'user',content:chat[1]})}
                className="w-full flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
                <GiCoffeeCup size={50}/>
            </button>

            <button
                onClick={() => append({role:'user',content:chat[2]})}
                className="w-full flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
                <GiAmpleDress size={50}/>
            </button>

            <button
                onClick={() => append({role:'user',content:chat[3]})}
                className="w-full flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
                <GiEnergyBreath size={50} />
            </button>
        </div>)
    )
}