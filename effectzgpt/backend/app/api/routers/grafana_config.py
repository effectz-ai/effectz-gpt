import os
from dotenv import set_key, load_dotenv
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

grafana_config_router = APIRouter()

class GrafanaEnvVars(BaseModel):
    grafana_dashboard_url: str
    grafana_api_key: str
    grafana_dashboard_id: str

ENV_FILE = ".env"

@grafana_config_router.get("/get_config")
async def get_grafana_config():
    grafana_dashboard_url = os.getenv("GRAFANA_DASHBOARD_URL")
    grafana_dashboard_id = os.getenv("GRAFANA_DASHBOARD_ID")
    
    if not all([grafana_dashboard_url, grafana_dashboard_id]):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Some environment variables are missing"
        )

    return JSONResponse({
        "grafana_dashboard_url": grafana_dashboard_url,
        "grafana_dashboard_id": grafana_dashboard_id
    })

@grafana_config_router.post("/update_config")
async def update_grafana_config(grafana_env_vars: GrafanaEnvVars):
    try:
        set_key(ENV_FILE, "GRAFANA_DASHBOARD_URL", grafana_env_vars.grafana_dashboard_url)
        set_key(ENV_FILE, "GRAFANA_API_KEY", grafana_env_vars.grafana_api_key)
        set_key(ENV_FILE, "GRAFANA_DASHBOARD_ID", grafana_env_vars.grafana_dashboard_id)
        
        load_dotenv(ENV_FILE, override=True)

        os.environ["GRAFANA_DASHBOARD_URL"] = str(grafana_env_vars.grafana_dashboard_url)
        os.environ["GRAFANA_API_KEY"] = str(grafana_env_vars.grafana_api_key)
        os.environ["GRAFANA_DASHBOARD_ID"] = str(grafana_env_vars.grafana_dashboard_id)

        return JSONResponse(content={"message": "Config updated successfully"})
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error: {e}",
        ) from e
