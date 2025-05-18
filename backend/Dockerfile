# Utilizar una imagen ligera de Python
FROM python:3.9-slim

# Crear el directorio de trabajo
WORKDIR /app

# Copiar el archivo de dependencias y la configuración
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente del backend
COPY . .

# Exponer el puerto de la API
EXPOSE 8000

# Ejecutar el servidor
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
