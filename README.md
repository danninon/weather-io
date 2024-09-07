# Weather App

### User Guide

**Running the Full-Stack Application (Backend & Frontend):**
- To start both the frontend and backend: `npm run start`
- To kill both processes:
  - Windows: `npm run windows_kill`
  - Linux: `npm run linux_kill`

**Server Endpoints:**
- **Weather Data:** [http://localhost:3000/api/weather?city={city_name}](/api/weather?city={city_name})
- **Health Check:** [http://localhost:3000/health](http://localhost:3000/health)
- **Default Server Port:** `3000`
- **Default Client Port:** `5173`
- **Client Endpoint:** [http://localhost:5173](http://localhost:5173)
- **Swagger Endpoint:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

### Application Highlights

#### Backend:

1. **Server-Client Data Handling:**
   - The backend communicates with the frontend using `req.query`, as the application primarily processes `GET` requests.
   - For future implementations (e.g., user registration), `req.body` could be used for more complex objects, but this is unnecessary for the current functionality.

2. **Shared Interface for Backend and Frontend:**
   - A shared interface ensures consistency between how data is structured and passed between the frontend and backend.

3. **Environment Variables (`.env`):**
   - The backend relies on a `.env` file, which should include the following mandatory fields:
     - `API_KEY`: Generated from [Weather API](https://www.weatherapi.com/)
     - `PORT`: The port on which the backend server will run.
     - `API_BASE_URL`: The base URL of the third-party API used by the service.

   - Optional environment variables:
     - `NODE_ENV`: Defines the environment (production or development) to adjust logging levels and features like Swagger.
     - `SWAGGER_EMAIL`: Displays the contact information in Swagger UI.

   - **Note**: Although sensitive information like `API_KEY` is stored in `.env`, it's pushed for demo purposes to simplify application setup.

4. **Validations:**
   - **Input Validation:** Basic input validation is implemented to sanitize user inputs.
   - **Third-Party API Validation:**
     - The application does not handle every potential edge case from the external API. For example, if multiple cities share the same name (e.g., Paris, France vs. Paris, USA), the API might return only one without prompting for further specificity.
     - Basic validation logic has been added to mitigate some of the more common issues (e.g., misformatted input like "lon don" still resolving to a city).

5. **Logging:**
   - A custom logger is implemented in `/libs` to provide clear logging for debugging and monitoring the data pipeline.

6. **Health Check:**
   - The backend includes a health check endpoint that verifies connectivity between the client-server and server-third party service.

7. **Swagger Documentation:**
   - Swagger is enabled during development for API documentation. This behavior can be toggled in the `.env` file by setting the `NODE_ENV` variable.

---

#### Frontend:

1. **Responsive Design:**
   - The application is responsive and supports multiple device types: desktops, tablets, and mobile phones.

2. **Time Display:**
   - All times are displayed in UTC format for consistency.

3. **Initial State:**
   - On launch, the application defaults to displaying the weather in Tel Aviv. This is for demonstration purposes and can be changed by entering a different city.

4. **Built Using Vite:**
   - The frontend is built using the [Vite](https://vitejs.dev/guide/why.html) build tool, which offers fast build times and a smoother development experience for React applications.

5. **Styling:**
   - The application uses only vanilla CSS, TSX, and HTML for layout and styling. The "Heebo" font is also used.
