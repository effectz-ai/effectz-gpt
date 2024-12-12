import { ClassDictionary } from 'clsx';
import { useState, useEffect } from 'react';

export const useGrafanaConfig = () => {
    const [data, setData] = useState<ClassDictionary>({
        "grafana_dashboard_url": "http://localhost:3000/", 
        "grafana_dashboard_id": 1});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/grafana/get_config");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching Grafana configuration:', error);
            }
        };

        fetchData();
    }, []);

    return data;
};
