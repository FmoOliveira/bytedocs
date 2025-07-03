# Visualizing SonarCloud Metrics with Python: Build a Custom Dashboard for Your Code Quality

*How to harness the SonarCloud API, Python, and Streamlit to create interactive dashboards that give your team real-time insight into code health and project quality.*

---

## Introduction

In today’s fast-moving software development landscape, tracking code quality isn’t just a nice-to-have—it’s essential. Tools like **SonarCloud** have become ubiquitous in CI/CD pipelines, providing rich insights into code coverage, technical debt, bugs, and security vulnerabilities. But while SonarCloud’s own dashboards are great, sometimes you need **custom analytics, visualizations tailored for your team, or integrations with your existing reporting workflows**.

That’s why I built the **SonarCloud Metrics Dashboard**: an open-source, Python-based tool that fetches metrics from the SonarCloud API, stores them in Azure Table Storage for fast access and historical analysis, and visualizes them with an interactive dashboard built in Streamlit.

In this article, I’ll show you:

* Why and how to fetch SonarCloud metrics programmatically
* How to design a user-friendly dashboard in Python
* How to persist and analyze historical code quality trends
* How to share your tool with your team—or the open-source community

Let’s dive in!

---

## Why Build Your Own SonarCloud Dashboard?

SonarCloud provides a powerful UI, but as your organization grows, you might face challenges like:

* Needing **custom charts or metric combinations** beyond what the web UI provides
* Wanting to **track trends over time** for KPIs across multiple repositories or branches
* Integrating code quality data into **automated reporting, business dashboards, or even team retrospectives**

Building your own dashboard means:

* Full control over the data, timeframes, and metrics you care about
* Ability to combine SonarCloud data with other sources (test coverage, deployment metrics, etc.)
* A great excuse to learn Streamlit and modern data visualization in Python

---

## Overview: SonarCloud Metrics Dashboard

**Features:**

* **Interactive dashboards:** View key metrics (coverage, bugs, vulnerabilities, code smells, etc.) for any project and branch
* **Historical trends:** Track changes over days, months, or a full year
* **Azure Table Storage integration:** Persist data for offline access and fast reloads
* **Customizable metrics and visualizations:** Choose what matters to your team
* **Open source and ready for you to extend**

> [GitHub Repo](https://github.com/FmoOliveira/SonarCloudDashboard)

---

## Architecture

Here’s how the main components fit together:

* **Streamlit Frontend:** Interactive web UI for metric selection, filtering, and visualization
* **SonarCloud API Client:** Handles authentication and metric fetching
* **Azure Table Storage:** Stores metric snapshots for historical analysis and caching
* **Visualization Components:** Trend lines, bar charts, box plots, and metric cards (built with Plotly)

Here’s a simplified diagram:

```
[SonarCloud API] <---> [Python API Client] <---> [Azure Table Storage]
        |                           |
    (live metrics)          (historical cache)
        |                           |
            [Streamlit Dashboard UI]
                    |
            [User: Selects Org/Project/Branch, Visualizes, Exports]
```

---

## Implementation: Step by Step

### 1. Prerequisites

* Python 3.8+
* SonarCloud account (and an [API token](https://sonarcloud.io/account/security/))
* Azure account (for Table Storage, optional but recommended)
* Basic knowledge of Python and working with virtual environments

### 2. Clone and Install

```bash
git clone https://github.com/FmoOliveira/SonarCloudDashboard.git
cd sonarcloud-metrics-dashboard
pip install -r requirements.txt
```

### 3. Configuration

Create a `.env` file in the project root:

```env
SONARCLOUD_TOKEN=your_sonarcloud_token
SONARCLOUD_ORG=your_sonarcloud_organization_key
AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string
```

### 4. How the Core Logic Works

#### a) Fetching Projects and Metrics

The `SonarCloudAPI` class in `sonarcloud_api.py` wraps API calls:

```python
class SonarCloudAPI:
    def __init__(self, token: str):
        self.token = token
        ...
    def get_organization_projects(self, organization: str) -> List[Dict]:
        ...
    def get_project_measures(self, project_key: str, branch: str = None) -> Optional[Dict]:
        ...
    def get_project_history(self, project_key: str, days: int, branch: str = None) -> List[Dict]:
        ...
```

* Get all projects in your organization
* For a given project/branch, fetch live or historical metrics (coverage, bugs, etc.)
* Handles API auth and error cases

#### b) Storing Metrics for Historical Analysis

`azure_storage.py` uses Azure Table Storage to cache metrics. This allows:

* Super-fast reloads
* The ability to analyze trends even if SonarCloud rate-limits your API access
* Easy export of all your historical data as CSV

#### c) Visualization and Dashboard

`app.py` is your Streamlit entry point:

* **Sidebar controls:** Select organization, project, branch, date range, and which metrics to display
* **Main area:** Metric cards (summary), trend charts, comparison charts, data tables, export buttons
* **Interactivity:** The dashboard updates only when you request it—so you can experiment with filters and metric combinations without unnecessary API calls

Example: Displaying a trend line for “coverage” metric over 30 days:

```python
def create_trend_chart(df: pd.DataFrame, metric: str, project_names: dict):
    ...
    fig = px.line(
        plot_data,
        x='date',
        y=metric,
        color='project_name',
        title=f"{metric.replace('_', ' ').title()} Trend Over Time",
        markers=True
    )
    st.plotly_chart(fig, use_container_width=True)
```

#### d) Exporting Your Data

The dashboard includes a download button to export the currently filtered dataset as CSV—ready for further analysis or sharing with your team.

---

## Running the Dashboard

Start the Streamlit app:

```bash
streamlit run app.py
```

Visit the local address provided in the terminal—typically [http://localhost:8501](http://localhost:8501).

---

## Customizing and Extending

* Want different charts? Extend `dashboard_components.py`.
* Need additional metrics? Update the metric lists in the API and storage classes.
* Want to support other backends (e.g., local SQLite, Google Sheets)? Just add a storage module.
* Fancy running this in Docker or deploying to Azure Web Apps? Easy—Streamlit supports containerization and cloud deployment.

---

## Try It Yourself!

* This project is licensed under the MIT License — use it, fork it, open issues or PRs. All contributions are welcome! See the repo on [GitHub](https://github.com/FmoOliveira/SonarCloudDashboard).
* Clone the repo, set your credentials, and visualize your own organization’s code quality!
* Want to integrate this with Slack, Teams, or email digests? The modular design makes that a straightforward extension.
* Got feedback or feature ideas? [Open an issue on GitHub!](https://github.com/FmoOliveira/SonarCloudDashboard/issues)

---

## Final Thoughts

This project was first and foremost a learning journey—a way for me to get hands-on with Streamlit, explore its rapid dashboarding capabilities, and see just how easily I could visualize real-world DevOps metrics. Building this SonarCloud dashboard was fun, experimental, and driven by curiosity rather than enterprise requirements.

If you’re considering using this in a production environment, please keep in mind:
This tool was built for fun and learning, not as a ready-made enterprise product. While it’s open-source and flexible, you should review, adapt, and test it thoroughly for your own use case before relying on it for critical reporting or team dashboards.

That said, I hope you find it inspiring—whether you want to tinker, learn Streamlit, or spin up a dashboard for your own data.
If you have suggestions, ideas, or want to improve it, I welcome your feedback and contributions!

---



**Tags:**
\#Python #DevOps #SonarCloud #CodeQuality #Streamlit #OpenSource #Azure #Dashboard #SoftwareEngineering


