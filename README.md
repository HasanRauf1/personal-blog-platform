# My Blog Application

This is a Ruby on Rails/React monolithic application for managing blog posts. It features user authentication, post management, and commenting, with a responsive front-end designed using Tailwind CSS.

## Features
- User authentication with Devise.
- CRUD operations for blog posts.
- Commenting system for posts.
- Front-end built with React and styled using Tailwind CSS.
- JavaScript bundling with Webpack via jsbundling.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Ruby 3.1.0
- Rails 7.0.8
- Node.js or Yarn
- PostgreSQL Database

## Getting Started
To get a local copy up and running, follow these simple steps:

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/HasanRauf1/personal-blog-platform.git
    ```
2. Navigate into the application directory: 
    ```bash
    cd personal-blog-platform
    ```

3. Install the required gems:

    ```bash
    bundle install
    ```

4. Install JavaScript dependencies:

    ```bash
    yarn install
    ```

5. Create and migrate the database:

    ```bash
    rails db:create
    rails db:migrate
    ```

## Running the Application
Start the application servers using the bin/dev script:

  ```bash
  bin/dev
  ```

This command will start both the Rails server and the Webpack dev server. Visit http://localhost:3000 in your browser to access the application.
