# Amazon-Clone

> A full-stack e-commerce application inspired by Amazon — React frontend with Node.js microservices for backend. Each service is containerized and routed through an Nginx reverse proxy.

---

## Quick gallery

1. **Home / Catalog:**  
   ![home_screenshot](Images/home_screenshot.PNG)

2. **Product Page:**  
   ![product_page](Images/product_page.PNG)

3. **Cart / Checkout:**  
   ![cart_checkout](Images/cart_checkout.PNG)

4. **Admin / Orders:**  
   ![orders_admin](Images/orders_admin.PNG)

> Replace the image names above with actual screenshots in `Images/` (example: `Images/home_screenshot.PNG`). If you don't have screenshots yet, remove this section or add them later.

---

## Table of Contents

- [Overview](#overview)  
- [Architecture](#architecture)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Install & Run (Docker Compose)](#install--run-docker-compose)  
- [Run services individually (dev)](#run-services-individually-dev)  
- [Configuration / .env examples](#configuration--env)  
- [Project structure](#project-structure)  
- [Troubleshooting](#troubleshooting)  
- [Contact](#contact)  
- [License](#license)

---

## Overview

This repo contains a containerized e-commerce platform split into multiple Node.js microservices and a React frontend. Nginx is used as a reverse proxy/gateway to route requests to the appropriate service. `docker-compose.yml` orchestrates everything for local development.

Microservices in this repo (each in its own folder):
- `Auth` — authentication (JWT / login / register)
- `Account` — user profile management
- `Product` — products CRUD & catalog
- `Cart` — cart service
- `Orders` — orders service
- `Payment` — payment gateway connector
- `Wishlist` — wishlist service
- `Home_Page` — frontend app (React)
- `nginx.conf` — routing / proxy config
- `docker-compose.yml` — orchestrates services and networks

---

## Architecture

```plaintext
[ Browser / Client ] --> nginx (reverse proxy)
                               |
       --------------------------------------------------------
       |          |             |           |           |     |
    Frontend   Auth         Product      Orders     Payment  Other
    (React)   (Service)     (Service)    (Service)   (Service)
       |          |             |           |           |
    (Static)  (API JWT)     (API CRUD)   (API)    (3rd-party)
```
All services are built/run as Docker containers and communicate over an internal Docker network.

---

## Feature
  - Microservice architecture (independent services)
  - React-based frontend (single-page app)
  - Nginx reverse proxy for routing
  - Dockerized for easy local deployment
  - Basic authentication and session flow (JWT)
  - Cart, wishlist, orders, payment microservices
  - Ready to extend with DB, cache and external integrations

---

## Prerequisites

Ensure the following are installed on your system:

1. **Docker** – 24.x or later
2. **Docker Compose** – v2.x (included with recent Docker Desktop)

Verify:

```plaintext
docker --version
docker compose version
```
