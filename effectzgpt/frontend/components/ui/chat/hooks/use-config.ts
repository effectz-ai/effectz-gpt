"use client";

import { useEffect, useMemo, useState } from "react";
import { getBaseURL } from "@/client/utils";

export interface ChatConfig {
  backend?: string;
  starterQuestions?: string[];
}

export function useClientConfig(): ChatConfig {
  const chatAPI = `${getBaseURL()}/api/chat`;
  const [config, setConfig] = useState<ChatConfig>();

  const backendOrigin = useMemo(() => {
    console.log("Effectz", chatAPI);
    return chatAPI ? new URL(chatAPI).origin : "";
  }, [chatAPI]);

  const configAPI = `${backendOrigin}/api/chat/config`;

  useEffect(() => {
    fetch(configAPI)
      .then((response) => response.json())
      .then((data) => setConfig({ ...data, chatAPI }))
      .catch((error) => console.error("Error fetching config", error));
  }, [chatAPI, configAPI]);

  return {
    backend: backendOrigin,
    starterQuestions: config?.starterQuestions,
  };
}
