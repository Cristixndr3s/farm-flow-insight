import random
import json

# Cargar la configuración desde el archivo JSON
with open("config.json") as f:
    config = json.load(f)

def generate_summary():
    initial_investment = random.randint(*config["investment_range"])
    production_estimated = random.randint(*config["production_range"])
    price_per_unit = random.randint(*config["price_per_unit_range"])
    projected_revenue = production_estimated * price_per_unit
    expected_profit = projected_revenue - initial_investment
    roi = (expected_profit / initial_investment) * 100
    cash_flow_status = "Positivo" if expected_profit > 0 else "Negativo"
    risk_level = "Medio" if roi > 50 else "Alto" if roi < 20 else "Bajo"

    return {
        "initialInvestment": initial_investment,
        "projectedRevenue": int(projected_revenue),
        "expectedProfit": int(expected_profit),
        "roi": round(roi, 2),
        "cashFlowStatus": cash_flow_status,
        "riskLevel": risk_level
    }

def generate_cash_flow():
    balance = 0
    cash_flow_data = []

    for month in ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]:
        if month in config["months_of_harvest"]:
            ingresos = random.randint(5000, 12000)
            egresos = config["fixed_costs"] + config["variable_costs"]
        else:
            ingresos = random.randint(0, 3000)
            egresos = config["fixed_costs"]
        
        balance += (ingresos - egresos)
        cash_flow_data.append({
            "month": month,
            "ingresos": ingresos,
            "egresos": egresos,
            "balance": balance
        })

    return cash_flow_data
