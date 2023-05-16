# IslandGo

IslandGo is a community-driven delivery application based in Malta. It aims to connect people who need items delivered with individuals who are willing to make the deliveries. This README.md provides an overview of the project and instructions for running it locally.

## Features

-   Creation and management of delivery requests
-   Search for nearby stores and delivery providers
-   Wishlist creation and management
-   Integration with Mapbox for interactive map display
-   Integration with PostgreSQL database

## Technologies Used

-   Django: a high-level Python web framework for backend development
-   Django REST framework: a powerful and flexible toolkit for building Web APIs
-   PostgreSQL: an open-source relational database management system
-   Docker: a platform for containerizing applications
-   JavaScript: for frontend development
-   Mapbox: a mapping platform for integrating maps into applications

## Installation

1. **Clone the repository**

    ```shell
    git clone https://github.com/your-username/IslandGo.git

    ```

2. **Set up the PostgreSQL database container using Docker**

    - Install [Docker](https://docs.docker.com/get-docker/)
    - Download and run the official [PosgreSQL/PostGIS docker image](https://registry.hub.docker.com/r/postgis/postgis/)
    - Create a .env file on the directory `IslandGoApp/IslandGoApp/.env` with the following environment variables

    ```shell
    PGADMIN_DEFAULT_EMAIL=root@admin.com
    PGADMIN_DEFAULT_PASSWORD=root
    POSTGRES_DB=mydb
    POSTGRES_USER=myuser
    POSTGRES_PASSWORD=mypassword
    POSTGRES_PORT=5432
    POSTGRES_HOST=localhost

    ```

3. **Install [GDAL](https://gdal.org/) (Required for Django to interface with PostGIS)**

    ```shell
    sudo apt-get install libpq-dev python-dev
    sudo apt-get install binutils libproj-dev gdal-bin

    ```

4. **Create a python virtual environment using `venv`**

    ```shell
    python3 -m venv venv

    ```

5. **Activate virtual environment**

    ```shell
    source venv/bin/activate

    ```

6. **Install Django and other dependencies**

    ```shell
    pip install -r requirements.text

    ```

7. **Set up your config file**
   -Create a config.js file on the directory `IslandGoApp/home/static/home/modules/config.js` with the following

    ```shell
    const TOKEN = 'yourtoken';
    export default TOKEN;
    ```

    -This token is needed for the map to work, you can get yours on [Mapbox](https://account.mapbox.com/access-tokens/). If you don\'t want to create an account you can kindly ask for my personal token

## Instructions to run

1. **Start PostgreSQL database service**
   -Run

    ```shell
    docker-compose up

    ```

2. **Run database migrations**

    ```shell
    python manage.py migrate

    ```

3. **Start Django web server (Make sure the virtual environment is activated)**

    ```shell
    python manage.py runserver
    ```

4. **Access the application in your web browser at `http://localhost:8000`**

## Usage

    - Browse different localities in Malta.
    - Select a store and create a wishlist specifying the items you need.
    - Create wishlists and manage your delivery requests.
    - Interact with other users through the application.

## Contributing

Contributions to the IslandGo project are welcome! If you have any bug fixes, improvements, or new features to propose, please follow these steps:

    1. Fork the repository.
    2. Create a new branch for your feature: `git checkout -b feature-name`.
    3. Make the necessary changes and commit them: `git commit -m 'Add some feature`'.
    4. Push your changes to your forked repository: `git push origin feature-name`.
    5. Submit a pull request to the main repository.

## License

**MIT License**

## Acknowledgements

    - Django
    - Django REST framework
    - PostgreSQL
    - Docker
    - Mapbox
