# AgriLink — fixed build

## What was fixed

- Product search no longer depends on a MongoDB text index; it searches title, crop, description and variety case-insensitively.
- `/api/listings/me/listings` is registered before `/api/listings/:id`, so the farmer's own-listings endpoint no longer gets interpreted as a listing ID.
- Registration normalizes email/name/phone/region and returns useful backend errors.
- Frontend network errors now clearly say when the API cannot be reached.
- Buyer Browse has an explicit error/retry state instead of only repeated red toasts.
- Language switching now translates static text across the whole React UI, including labels, buttons, filters, placeholders and authentication screens.
- A development `.env` is included with safe local defaults.
- On a fresh development database, six demo marketplace listings and a demo farmer are seeded automatically so the search page is not empty.

## Run on Windows

1. Install Node.js 18+.
2. Start MongoDB locally on port 27017, or use MongoDB Compass with a local MongoDB service.
3. Open a terminal in this project folder.
4. Run:

```bash
npm install
npm run dev
```

The client is at `http://localhost:5173` and the API is at `http://localhost:5000`.

### If MongoDB is not installed

If Docker Desktop is installed:

```bash
docker run --rm -d -p 27017:27017 --name agrilink-mongo mongo:7
```

Then run `npm run dev`.

## Demo search

Open Browse and search for:

- Tomato
- Onion
- Rice
- Green Chilli
- Banana
- Potato

The demo data is inserted only when the database has no listings and `DEMO_SEED=true`.

## Demo farmer

Email: `demo.farmer@agrilink.local`
Password: `DemoFarmer123!`

Change this before using the application outside a demo environment.
