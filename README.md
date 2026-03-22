# Portfolio_new

This is a React + Vite portfolio project with a Node.js backend for the contact form.

## Frontend setup

```bash
npm install
npm run dev
```

Create a root `.env` from `.env.example` if you want to override the API URL manually:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Backend setup

1. Go to the backend folder and install dependencies:

```bash
cd backend
npm install
```

2. Create `backend/.env` from `backend/.env.example`.

3. Put your Resend settings in that file:

```env
PORT=5000
FRONTEND_URLS=http://localhost:5173,https://your-frontend-domain.onrender.com
MAIL_TO=myteam034221@gmail.com
MAIL_FROM=Portfolio Contact <onboarding@resend.dev>
RESEND_API_KEY=your_resend_api_key
```

4. Start the backend:

```bash
npm run dev
```

## Run both apps

Use two terminals:

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
cd backend
npm run dev
```

## Important Resend note

For quick testing, you can use `onboarding@resend.dev` as the sender. For production, verify your own domain in Resend and then update `MAIL_FROM` to an address on that domain.

## Deploy online with Render

This repo now includes `render.yaml`, so you can deploy both frontend and backend from the same GitHub repo.

### 1. Push this code to GitHub

```bash
git add .
git commit -m "Add contact form backend and deployment config"
git push origin main
```

### 2. Create the Render services

1. Sign in to Render.
2. Choose `New +` -> `Blueprint`.
3. Connect your GitHub repo `Portfolio_new`.
4. Render will detect `render.yaml` and create:
   - `portfolio-backend`
   - `portfolio-frontend`

### 3. Set backend environment variables in Render

For `portfolio-backend`, set:

```env
FRONTEND_URLS=https://your-frontend-domain.onrender.com
MAIL_TO=myteam034221@gmail.com
MAIL_FROM=Portfolio Contact <onboarding@resend.dev>
RESEND_API_KEY=your_resend_api_key
```

### 4. Set frontend environment variable in Render

For `portfolio-frontend`, set:

```env
VITE_API_BASE_URL=https://your-backend-domain.onrender.com
```

### 5. Redeploy both services

After saving the environment variables, redeploy the frontend and backend. Then the live contact form will send emails to `myteam034221@gmail.com`.

## Production notes

- If your frontend URL changes, update `FRONTEND_URLS` in the backend service.
- If you use a custom domain, add that domain to `FRONTEND_URLS` too.
- The frontend sends requests to `VITE_API_BASE_URL/api/contact`.
