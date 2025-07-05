# Contributing to Morpheus Asia

This guide details how to contribute to both the `mor-asia-backend` repository and the `mor-asia-frontend` repository. Together, these repositories work to run the morpheus.asia website for the Morpheus Asia community.

## Initial Setup

### Backend Setup (mor-asia-backend)

We'll start by getting the `mor-asia-backend` running locally, which is a backend that runs on the Strapi CMS.

#### 1. Database Setup

1. Download the sample DB dump which contains example data
2. Import this into a local PostgreSQL instance

#### 2. Repository Setup

1. Clone the `mor-asia-backend` repository
2. Open terminal and navigate to the directory
3. Run `npm install` to install the required dependencies

#### 3. Environment Configuration

1. Copy the `.env.template` file and rename it to `.env`
2. Add the following variables to the `.env` file:

```env
# Database
DATABASE_CLIENT=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=
DATABASE_FILENAME=

# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=

# Spaces
DO_SPACE_ACCESS_KEY=
DO_SPACE_SECRET_KEY=
DO_SPACE_ENDPOINT=
DO_SPACE_BUCKET=

# Mail
MAILLITE_SUBSCRIBER_API_KEY=
MAILLITE_API_URL=
SENDGRID_API_KEY=
SENDGRID_RECIPIENT=
SENDGRID_FROM=
RECAPTCHA_SECRET_KEY=

# Coincap
COINCAP_API_KEY=
COINCAP_API_URL=

# RPC
ETHEREUM_RPC_URL=

# Special
MORPHEUS_API_URL=
```

> **Note:** `MORPHEUS_API_URL` is to be replaced with the appropriate value.

#### 4. Start the Development Server

After all environment variables have been added to the file:

1. Run `npm run develop` in the terminal to start the Strapi development server
2. Navigate to `localhost:1337` to configure the Strapi instance
3. Ensure everything is working properly

If you encounter any specific problems related to this setup, you can find solutions in the Support Sections for the Strapi CMS.

### Frontend Setup (mor-asia-frontend)

#### 1. Repository Setup

1. Clone the `mor-asia-frontend` repository
2. Navigate to the directory using `cd`
3. Run `npm install` to install dependencies

#### 2. Environment Configuration

1. Copy the `.env.template` file and rename it to `.env`
2. Add the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:1337

# Analytics
NEXT_PUBLIC_GA_ID=

# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

#### 3. Start the Development Server

Run `npm run dev` to start the frontend development server.

## Development Workflow

1. Ensure both backend (`localhost:1337`) and frontend (`localhost:3000`) are running
2. Make your changes to the appropriate repository
3. Test your changes locally
4. Submit a pull request with a clear description of your changes

## Support

For specific problems related to Strapi CMS, refer to the Support Sections in the project documentation.

## Getting Help

If you encounter any issues during setup or development, please:

1. Check the existing issues in the respective repositories
2. Review the Support Sections documentation
3. Create a new issue with detailed information about your problem

---

Thank you for contributing to Morpheus Asia! 🚀