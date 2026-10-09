"""
Surya V M Portfolio - Python FastAPI Reference Service
Demonstrates the high-performance async microservice architecture used for AI & IoT Telemetry.
"""

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field
import datetime
from typing import Optional

app = FastAPI(
    title="Surya V M - Telemetry & AI Gateway",
    description="FastAPI service for IoT anomaly detection and predictive procurement algorithms",
    version="1.0.0"
)

class ContactPayload(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=3000)
    honeypot: Optional[str] = None

class MachineTelemetry(BaseModel):
    node_id: str
    current_rms: float
    vibration_x: float
    vibration_y: float
    vibration_z: float
    core_temp_c: float

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "FastAPI AIoT Engine",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.post("/api/contact")
async def handle_contact(payload: ContactPayload):
    # Spam honeypot trap
    if payload.honeypot and payload.honeypot.strip():
        return {"success": True, "message": "Message processed successfully"}

    return {
        "success": True,
        "message": f"Thank you {payload.name}, your message has been received.",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.post("/api/telemetry/score")
async def score_machine_health(data: MachineTelemetry):
    # Baseline comparison algorithm (EcoClamp / BeltSentinel)
    is_anomaly = data.current_rms > 20.0 or data.core_temp_c > 65.0
    health_score = 98.4 if not is_anomaly else 64.2
    
    return {
        "node_id": data.node_id,
        "health_score": health_score,
        "status": "ANOMALY_DETECTED" if is_anomaly else "NORMAL_BASELINE",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("python_service_reference:app", host="0.0.0.0", port=8000, reload=True)
