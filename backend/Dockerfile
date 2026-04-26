# Use Python 3.13 as the base
FROM python:3.13-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies needed for Postgres
RUN apt-get update && apt-get install -y libpq-dev gcc

# Copy the requirements file we just made
COPY requirements.txt .

# Install the Python libraries
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Run the app
CMD ["python", "app.py"]
