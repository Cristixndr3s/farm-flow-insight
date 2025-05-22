import os, json, re
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# Verificar que el token existe
if not HF_TOKEN:
    raise EnvironmentError("No se encontró el HF_TOKEN en el entorno o archivo .env")

# Cliente Hugging Face
cliente = InferenceClient(
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    token=HF_TOKEN
)

# Leer la tabla JSON original
input_path = "public/data/cashflow.json"
output_path = "public/data/resultado.json"

if not os.path.exists(input_path):
    raise FileNotFoundError(f"No se encontró el archivo: {input_path}")

with open(input_path, 'r', encoding='utf-8') as f:
    tabla = json.load(f)

# Construir el prompt
prompt = f"""
A partir de la siguiente tabla de flujo de caja mensual, realiza dos tareas y entrega la respuesta en formato JSON válido.

1. "riesgo": Un párrafo breve explicando el análisis de riesgo de esta proyección financiera. El texto debe ser claro, concreto y apto para mostrarse dentro de una etiqueta HTML <p>. No uses los nombres 'analysis', 'análisis' ni otras variantes.

2. "recommendations": Una lista de objetos. Cada objeto debe tener:
  - "title": un título breve
  - "description": una explicación del porqué
  - "priority": puede ser 'Alta', 'Media' o 'Baja'

Este es el formato exacto esperado:

{{
  "riesgo": "<texto del análisis>",
  "recommendations": [
    {{
      "title": "Título breve",
      "description": "Explicación concreta",
      "priority": "Alta"
    }}
  ]
}}

Aquí está la tabla a analizar:

{json.dumps(tabla, ensure_ascii=False)}
"""

# Consultar al modelo
print("⌛ Consultando modelo...")
try:
    respuesta = cliente.chat.completions.create(
        messages=[{"role": "user", "content": prompt}]
    )
    contenido = respuesta.choices[0].message.content.strip()
except Exception as e:
    print("❌ Error al consultar el modelo:", str(e))
    exit(1)

print("\n🧾 RESPUESTA DEL MODELO:\n")
print(contenido)

# Limpiar si viene con ```json
if contenido.startswith("```json"):
    contenido = re.sub(r"```json|```", "", contenido).strip()

# Intentar parsear
try:
    resultado_json = json.loads(contenido)
except json.JSONDecodeError as e:
    print("❌ Error al parsear la respuesta como JSON:", e)
    exit(1)

# Guardar resultado
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(resultado_json, f, indent=2, ensure_ascii=False)

print(f"\n✅ Resultado guardado en {output_path}")
