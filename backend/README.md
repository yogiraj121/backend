Student Grades Manager (Backend)

Setup

- Create .env with PORT, MONGODB_URI, CLIENT_ORIGIN (see example below)
- npm install
- npm run dev

.env example
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5173

API

- POST /api/uploads (multipart form-data: file) - upload .xlsx or .csv
- GET /api/uploads/history - last uploads
- GET /api/students - list students
- PUT /api/students/:id - update fields
- DELETE /api/students/:id - delete record
