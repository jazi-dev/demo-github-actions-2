# demo-github-actions-2

Small notes app for practicing Docker Compose locally and GitHub Actions on push.

Browser -> Nginx frontend -> Express backend -> PostgreSQL

## Run locally

```bash
cd ~/demo-github-actions-2
cp .env.example .env   # already filled for local use
docker compose up --build
```

Open: http://localhost:8081

Host ports are **8081** (web) and **5433** (Postgres) so this can run next to `demo-github-actions`.

Beekeeper / any SQL client:

- Host: `127.0.0.1`
- Port: `5433`
- User: `boxuser`
- Password: `devpassword`
- Database: `ideabox`
- SSL: off

Stop:

```bash
docker compose down
```

Delete stored ideas:

```bash
docker compose down -v
```

## Connect CI from scratch

The workflow file is already in `.github/workflows/docker-publish.yml`. Your job is to hook the repo to GitHub so a push to `main` builds and publishes images.

1. Create an empty GitHub repository (do not add a README on GitHub).
2. On Docker Hub, create two repositories: `demo-github-actions-2-frontend` and `demo-github-actions-2-backend`.
3. Create a Docker Hub access token (Read & Write).
4. In the GitHub repo: **Settings > Secrets and variables > Actions**, add:
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN`
5. From this folder:

```bash
git init
git add .
git commit -m "Initial demo-github-actions-2 app"
git branch -M main
git remote add origin git@github.com:YOUR_USER/demo-github-actions-2.git
git push -u origin main
```

6. Open the GitHub **Actions** tab. The `Build and Push Docker Images` workflow should run on that push.

What the workflow does: checkout the code, log in to Docker Hub, build `./frontend` and `./backend`, push `:latest` tags.
# demo-github-actions-2
