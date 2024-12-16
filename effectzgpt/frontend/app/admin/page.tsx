"use client";

import { fetchIsAppConfigured } from "@/client/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ChatConfig } from "@/sections/config/chat";
import { ModelConfig } from "@/sections/config/model";
import { ToolConfig } from "@/sections/config/tool";
import { DemoChat } from "@/sections/demoChat";
import { Knowledge } from "@/sections/knowledge";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Home() {
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState(false);
  const [configured, setConfigured] = useState<boolean>();

  useEffect(() => {
    const hash = pathname.split("#")[1];
    if (hash === "new") {
      setShowWelcome(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (configured === undefined) {
      fetchIsAppConfigured().then((data) => {
        setConfigured(data);
      });
    }
  }, [configured]);

  function handleDialogState(isOpen: boolean) {
    setShowWelcome(isOpen);
    if (!isOpen) {
      if (window.location.hash === "#new") {
        window.history.pushState({}, document.title, window.location.pathname);
      }
    }
  }

  function handleModelConfigChange() {
    // Fetch the app configuration again to update the state
    fetchIsAppConfigured().then((data) => {
      setConfigured(data);
    });
  }

  return (
    <>
      <main className="h-screen w-screen">
        <div className="flex flex-col max-h-full h-full">
          <div className="w-full flex-1 overflow-auto flex">
            <div
              className={cn("w-1/2 overflow-y-auto p-4", {
                "m-auto": !configured,
              })}
            >
              <ModelConfig
                sectionTitle={configured ? "Update model" : "Start"}
                sectionDescription={
                  configured
                    ? "Change to a different model or use another provider"
                    : "Set up an AI model to start the app."
                }
                configured={configured}
                onConfigChange={handleModelConfigChange}
              />
              {configured && (
                <>
                  <ChatConfig />
                  <ToolConfig />
                  <Knowledge />
                </>
              )}
            </div>
            {configured && (
              <div className="flex-1 overflow-y-auto p-4">
                <DemoChat />
              </div>
            )}
          </div>
        </div>
      </main>
      <Toaster />
      <Dialog open={showWelcome} onOpenChange={handleDialogState}>
        <DialogContent>
          <DialogTitle className="text-green-500">
            Congratulations 🎉
          </DialogTitle>
          <DialogDescription>
            You have successfully installed RAGapp. Now, let&apos;s go ahead and
            configure it.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
