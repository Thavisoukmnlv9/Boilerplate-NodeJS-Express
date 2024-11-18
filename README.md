
# Boilerplate for Node.js Backend API

This boilerplate provides a robust foundation for building a Node.js-powered API. It integrates key tools and libraries such as PostgreSQL, Express, API logging, middleware, Swagger, and Prisma for efficient backend development.

## Features

- Database: PostgreSQL integration with Prisma ORM.
- API Documentation: Swagger setup for seamless API documentation.
- Authentication: JWT-based authentication with private and public key configuration.
- Logging: API logging for request tracking and debugging.
- Middleware: Pre-configured middleware for common use cases.

## Prerequisites

1. Database: Create a new PostgreSQL database:

        CREATE DATABASE boilerplate;

2. Environment Variables: Configure the .env file with your settings (refer to the Basic Settings section).

# Installation

1. Clone the Repository:

        git clone https://github.com/Thavisoukmnlv9/Boilerplate-NodeJS-Express.git
        cd boilerplate

2. Install Dependencies:

        yarn install

# Basic Settings

Create a .env file in the root of your project with the following content:

    ##Application Settings

    NODE_ENV=development
    SERVICE_NAME=boilerplate
    HOST=0.0.0.0
    NODE_PORT=3000
    BASE_PATH=/boilerplate
    TZ=Asia/Bangkok

    ## Database Configuration

    DATABASE_URL="postgresql://<username>:<password>@<host>:5432/<database>?schema=<db_name>&timezone=UTC"

    ## JWT Configuration

    JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n<your-private-key>\n-----END RSA PRIVATE KEY-----"
    JWT_REFRESH_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your-refresh-private-key>\n-----END PRIVATE KEY-----"
    JWT_REFRESH_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n<your-public-key>\n-----END PUBLIC KEY-----"

# Usage

## Start the Development Server

Run the server with:

    yarn dev

## Access API Documentation

Swagger is available at:

    http://127.0.0.1:3000/swagger