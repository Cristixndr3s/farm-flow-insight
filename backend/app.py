from fastapi import FastAPI
from data_generator import generate_summary, generate_cash_flow

app = FastAPI()

@app.get("/api/generate-data")
async def generate_data():
    summary = generate_summary()
    cash_flow = generate_cash_flow()
    return {
        "summary": summary,
        "cashFlowData": cash_flow
    }
