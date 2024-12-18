import Image from "next/image";
import { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { useGrafanaConfig } from './ui/chat/hooks/grafana-config';

export default function Header() {
    const [grafanaDashboardUrl, setGrafanaDashboardUrl] = useState('');
    const [grafanaDashboardId, setGrafanaDashboardId] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [grafanaApiKey, setGrafanaApiKey] = useState('');

    const data = useGrafanaConfig();

    useEffect(() => {
        setGrafanaDashboardUrl(data.grafana_dashboard_url);
        setGrafanaDashboardId(data.grafana_dashboard_id);
    }, [data.grafana_dashboard_url, data.grafana_dashboard_id]);

    const isButtonDisabled = !grafanaApiKey;

    async function handleUpdate() {
        try {
            const response = await fetch('http://localhost:5001/api/grafana/update_config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grafana_dashboard_url: grafanaDashboardUrl,
                    grafana_api_key: grafanaApiKey,              
                    grafana_dashboard_id: grafanaDashboardId
                })
            });

            if (response.ok) {
                console.log('Configuration updated successfully');
                setIsSettingsOpen(false);
            } else {
                console.error('Error updating configuration');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="text-xl font-nunito text-gray-800">GrafanaGPT</div>
            <button onClick={() => setIsSettingsOpen(true)} className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-600 flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
            </button>
            <div className="flex items-center">
                <a
                    href="https://www.effectz.ai/"
                    className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
                >
                    <span>Built by Effectz.AI</span>
                    <Image
                        className="rounded-xl"
                        src="/effectz.png"
                        alt="Effectz Logo"
                        width={40}
                        height={40}
                        priority
                    />
                </a>
            </div>
            {isSettingsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 relative">
                        <button
                            onClick={() => setIsSettingsOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Settings</h2>
                        <div className="mb-4">
                            <label htmlFor="grafanaDashboardURL" className="block mb-2 text-gray-700">
                                Grafana Dashboard URL
                            </label>
                            <input
                                id="grafanaDashboardUrl"
                                type="text"
                                value={grafanaDashboardUrl}
                                onChange={(e) => setGrafanaDashboardUrl(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="grafanaApiKey" className="block mb-2 text-gray-700">
                                Grafana API Key
                            </label>
                            <input
                                id="grafanaApiKey"
                                type="password"
                                value={grafanaApiKey}
                                onChange={(e) => setGrafanaApiKey(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="grafanaDashboardId" className="block mb-2 text-gray-700">
                                Grafana Dashboard ID
                            </label>
                            <input
                                id="grafanaDashboardId"
                                type="text"
                                value={grafanaDashboardId}
                                onChange={(e) => setGrafanaDashboardId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleUpdate}
                            disabled={isButtonDisabled}
                            className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isButtonDisabled
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-black text-white hover:bg-gray-900"
                                }`}
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

