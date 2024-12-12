from dotenv import load_dotenv

load_dotenv()

import os
import logging
import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

url = os.getenv("GRAFANA_DASHBOARD_URL")
api_key = os.getenv("GRAFANA_API_KEY")
dashbaord_id = int(os.getenv("GRAFANA_DASHBOARD_ID"))

if url is None:
    raise ValueError(
        "Please set the Grafana Dashboard URL"
    )

if api_key is None:
    raise ValueError(
        "Please set the Grafana API key"
    )

if dashbaord_id is None:
    raise ValueError(
        "Please set the Grafana Dashboard ID"
    )

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

def generate_panel(panel_config: dict):
    payload = {
        "dashboard": {
            "id": dashbaord_id,
            "title": "Test Dashboard",
            "panels": panel_config
        },
        "folderId": 0,
        "overwrite": True
    }

    response = requests.post(f"{url}api/dashboards/db", headers=headers, json=payload)

    print(response.text)

    if response.status_code == 200:
        logger.info("Panel generated successfully")
    else:
        logger.error(f"An error occured during Grafana panel generation")
