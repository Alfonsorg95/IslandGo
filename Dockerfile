# Base image
FROM python:3.10-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN apt-get update && \
    apt-get install -y libpq-dev postgis gdal-bin libgdal-dev && \
    apt-get install -y gcc python3-dev musl-dev postgresql-client

# Set working directory
WORKDIR /code

# Copy project files to container
COPY . /code/

# Set environment variables
ENV POSTGRES_DB=islandgo
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_PORT=5432
ENV POSTGRES_HOST=postgres-1
ENV PGADMIN_DEFAULT_EMAIL=root@admin.com
ENV PGADMIN_DEFAULT_PASSWORD=root

# Create the .env file
RUN echo "POSTGRES_DB=${POSTGRES_DB}" >> IslandGoApp/IslandGoApp/.env
RUN echo "POSTGRES_USER=${POSTGRES_USER}" >> IslandGoApp/IslandGoApp/.env
RUN echo "POSTGRES_PORT=${POSTGRES_PORT}" >> IslandGoApp/IslandGoApp/.env
RUN echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >> IslandGoApp/IslandGoApp/.env
RUN echo "POSTGRES_HOST=${POSTGRES_HOST}" >> IslandGoApp/IslandGoApp/.env
RUN echo "PGADMIN_DEFAULT_EMAIL=${PGADMIN_DEFAULT_EMAIL}" >> IslandGoApp/IslandGoApp/.env
RUN echo "PGADMIN_DEFAULT_PASSWORD=${PGADMIN_DEFAULT_PASSWORD}" >> IslandGoApp/IslandGoApp/.env

# Install requirements
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port 8000 for web server
EXPOSE 8000
