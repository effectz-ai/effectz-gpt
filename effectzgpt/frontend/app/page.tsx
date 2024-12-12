'use client'
import { useState } from 'react';
import Header from '@/components/header';
import DashboardView from '@/components/dashboard-view';
import ChatButton from '@/components/chat-button';
import ChatPopUp from '@/components/chat-popup';
import { useGrafanaConfig } from '../components/ui/chat/hooks/grafana-config';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const grafana_dashboard_url = `${useGrafanaConfig().grafana_dashboard_url}d/ce6ghx4khzgn4f/test-dashboard?orgId=1&from=now-7d&to=now&timezone=browser&kiosk`;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow relative">
        <DashboardView src={grafana_dashboard_url}/>
        <div className="absolute bottom-4 right-4">
          <ChatButton onClick={() => setIsChatOpen(true)} />
        </div>
        {isChatOpen && <ChatPopUp onClose={() => setIsChatOpen(false)} />}
      </main>
    </div>
  )
}

