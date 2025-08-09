# ByteDocs

> Always curious, always building.

This is the repository for the ByteDocs blog, a personal tech blog by [Filipe Oliveira](https://www.linkedin.com/in/filipe-oliveira-05724850/).

## About This Project

This site is built with [Eleventy](https://www.11ty.io/), a simpler static site generator. It serves as a place to document and share findings, tutorials, and thoughts on software development.

The articles cover topics like:
*   Python development and tooling
*   Cloud services (like Azure and SonarCloud)
*   Data visualization with tools like Streamlit
*   General software engineering practices

## Getting Started

To run this project locally, you will need Node.js and npm installed.

### 1. Clone this Repository

```bash
git clone <this-repository-url> my-blog
```
*(Note: Replace `<this-repository-url>` with the actual URL of this repository.)*

### 2. Navigate to the directory

```bash
cd my-blog
```

### 3. Install dependencies

```bash
npm install
```

## Running the Project

You can run the project in a few different ways:

*   **Build the site:**
    ```bash
    npm run build
    ```
    This will create a `_site` directory with the generated static files.

*   **Serve the site locally:**
    ```bash
    npm start
    ```
    This will start a local development server, usually at `http://localhost:8080`, and it will automatically rebuild the site when you make changes.

*   **Run in debug mode:**
    ```bash
    npm run debug
    ```

## Project Structure

*   `posts/`: Contains the blog posts, typically in Markdown format.
*   `_data/metadata.json`: Global data and site-wide settings like the title, author, and description.
*   `_includes/`: Contains the Nunjucks templates and layouts used to structure the pages.
*   `css/`: Contains the stylesheets.
*   `.eleventy.js`: The main configuration file for Eleventy.
