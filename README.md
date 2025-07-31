## Data Models (Schemas)
  While I don’t have access to the exact code, most MERN‑based URL shorteners follow a common structure:

  URL
    Fields: urlCode, longUrl, shortUrl, dateCreated, clickCount, optionally userId (if authenticated), optional custom alias, expiration, analytics.
    Purpose: Stores mapping between long and short URLs, plus click tracking and metadata.
    
  User (if authentication is implemented)
    Fields: name, email, passwordHash, role, list of urlsCreated
    Purpose: Manage authenticated users, allow them to create/manage their URLs.

  Analytics (optional/sub‑collection)
    Could store per‑click data: timestamp, ip, referrer, browser, device, etc.

## Workflow Overview
   1. HTTP Request to Shorten URL
      - Frontend sends POST /api/url with longUrl (and optional custom alias).
      - Backend validates URL (e.g., with valid-url) and checks for duplicates.
      - Generates a unique urlCode (via shortid or nanoid).
      - Constructs shortUrl = BASE_URI + "/" + urlCode.
      - Saves to MongoDB and returns shortUrl to frontend.

  2. Redirect Route
     - When user accesses GET /:code:
     - Backend searches URL collection for urlCode.
     - If found, increments clickCount (and logs analytics if implemented), then issues a redirect (HTTP 302) to the longUrl.
     - If not found or expired, returns 404 or an error page.

  3. Dashboard / Analytics (if authenticated)
     - Authenticated user views their created links.
     - Backend returns a list of URLs associated with the user.
     - Each item shows statistics (clickCount, custom alias, dateCreated).

  4. User Authentication (optional)
     - Signup flow: POST /auth/signup → store user, hash password.
     - Login: POST /auth/login → verify and issue JWT.
     - Protected link creation: only logged‑in users can create URLs or manage them.
