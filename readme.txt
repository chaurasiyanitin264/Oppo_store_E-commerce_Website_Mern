## 📥 How to Run the Oppo E-Commerce Website

### 1. Download the project ZIP
- Clone the repository or download the ZIP file from the project source.

### 2. Extract the project
- Extract the ZIP and navigate to the main project folder.

### 3. Backend Setup

#### a. Open terminal and navigate to the backend folder:
```bash
cd backend


b.Install backend dependencies:
npm install

c. Create a .env file in the backend folder and add:
PORT=8000
DBCONN=mongodb+srv://chaurasiyanitin264:QAJDz2JpJIYIi5Tm@cluster0.0yeli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# DBCONN=mongodb://localhost:27017/Mern_Finer
JWT_SECRET=Nitin1234
KEY_ID=rzp_test_kDhR9S2dT4FiqU
KEY_SECRET=Fr4kagvKk9Y7aYZec2TLo5C1
TOKEN_KEY=Nitin1234

d. Start the backend server:
nodemon
### The backend will run at http://localhost:8000


4. Frontend Setup
a. Open another terminal and navigate to the frontend folder:
cd frontend
b. Install frontend dependencies:
npm install
c. Create a .env file in the frontend folder and add:
env
REACT_APP_API_URL=http://localhost:8000
d. Start the frontend development server:
npm run dev
The frontend will run at http://localhost:8000

5. Open the Website in Browser
Open your browser and go to:
http://localhost:8000 — Frontend (User View)
http://localhost:8000 — Backend API

🛡️ Login Credentials
🔐 Admin Panel
email: Nitin@gmail.com

password: N1234

👤 Customer/User Panel
Username: Nitin@gmail.com


Password: N1234

