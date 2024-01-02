# My Blog Application

This is a Ruby on Rails/React monolithic application for managing blog posts. It features user authentication, post management, and commenting, with a responsive front-end designed using Tailwind CSS. The platform also includes a real-time SMS notification feature powered by Twilio, integrated with Sidekiq for background processing.

## Features
- User authentication with Devise.
- CRUD operations for blog posts.
- Real-time SMS notifications for new posts and comments.
- Specific and general subscription options for users.
- Responsive UI design with Tailwind CSS.
- Background job processing with Sidekiq.
- API development with Active Model Serializers.
- JavaScript bundling with Webpack via jsbundling.


## Getting Started
## Prerequisites
Before you begin, ensure you have met the following requirements:
- Ruby 3.1.0
- Rails 7.0.8
- Node.js or Yarn
- PostgreSQL Database
- Redis server for Sidekiq
- Twilio account for SMS functionality

### Installation
To get a local copy up and running, follow these simple steps:
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
6. In a new terminal, start Sidekiq for background jobs:

    ```bash
    bundle exec sidekiq
    ```
## Configuration

- Set up your Twilio credentials and other environment variables in config/credentials.yml.enc.

## Running the Application
- Start the application servers using the bin/dev script:
  ```bash
  bin/dev
  ```
- Visit http://localhost:3000 to view the application.
- Sign up to create an account, and start creating blog posts.
- Subscribe to receive SMS notifications for new posts or comments.
