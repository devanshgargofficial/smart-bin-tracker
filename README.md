# **AI-Powered Smart Waste Management System**  

## **Problem Statement**  
Waste management in urban areas is a major challenge, with overflowing bins leading to environmental pollution, health hazards, and inefficient collection processes. A lack of real-time monitoring results in delays in waste disposal, increasing operational costs and environmental damage. Additionally, citizens do not have an efficient way to classify waste correctly, leading to improper disposal and contamination of recyclable materials.  

## **Solution Overview**  
Our **AI-powered smart waste management system** provides a **real-time bin monitoring** and **AI-based waste classification** solution to optimize waste collection and segregation.  

### **Features**  

### ✅ **Smart Bin Monitoring**  
- Citizens can view **live bin locations on a map**.  
- Clicking on a bin shows **its waste levels** (organic & recyclable).  
- If the bin reaches **75% capacity**, an **alert is sent** to waste management authorities to schedule collection.  

### 🤖 **AI-Powered Waste Classification**  
- Citizens can **upload or drag-and-drop an image** of their waste.  
- A **Gemini AI model** classifies it into **organic** or **recyclable** waste.  
- The classified waste is logged into the selected bin.  

### 🔧 **Admin Dashboard**  
- Admins can **add new bins** with unique names and locations.  
- They can **monitor bin levels citywide** and receive **alerts** for full bins.  
- An **"Empty Bin" feature** allows admins to simulate waste collection.  


# Technologies Used

## **Frontend**
- **React** – UI framework for building interactive interfaces  
- **Tailwind CSS** – Utility-first CSS framework  
<!-- - **Framer Motion** – Animation library  
- **Radix UI** – Accessible UI components  
- **Recharts** – Charting library for data visualization  -->

## **Backend**
- **Express.js** – Web framework for Node.js  
- **Node.js** – JavaScript runtime for backend development  
- **Dotenv** – Environment variable management
  <!-- - <-- - **Passport.js** – Authentication middleware  
- **Drizzle ORM** – Database ORM for TypeScript  --> -->

## **Database**
- **PostgreSQL** – Relational database  
- **Neon Database** – Serverless PostgreSQL solution  
<!-- - **MongoDB** – NoSQL database (if applicable)   -->

## **AI & API Integration**
- **Google Gemini API** – AI-powered features  

## **State Management**
- **Zustand** – Lightweight state management  
- **React Query** – Data fetching and caching  

## **Build & Tooling**
- **Vite** – Fast frontend build tool  
- **TypeScript** – Statically typed JavaScript  
- **Esbuild** – Fast JavaScript bundler  

## **Authentication & Session Management**
- **Express-session** – Session management  
- **Connect-pg-simple** – PostgreSQL session store  
- **Memorystore** – In-memory session caching  

## **Maps & Visualization**
- **Leaflet.js** – Interactive maps  
- **React-Leaflet** – React bindings for Leaflet  

## **Deployment & Production**
- **Render/Vercel** – Cloud deployment platforms  

  

<!--
## **Key Technologies Used**  
- **Frontend:** React (Map visualization, UI, drag & drop upload)  
- **Backend:** Node.js, Express (API handling, bin management)  
- **Database:** PostgreSQL (Bin storage, waste tracking)  
- **AI Model:** Google Gemini (Classifies waste as organic or recyclable)  
- **Cloud Deployment:** Render (Backend & database hosting)  
- **Alerts:** Automated notifications for waste collection scheduling  -->

This solution **improves waste segregation**, **optimizes collection schedules**, and **reduces environmental impact** by ensuring timely waste disposal. 🚀♻️  





# Step-by-Step Installation


## Dependencies




- express
- express-session
- passport
- passport-local
- dotenv
- drizzle-orm
- drizzle-kit
- @google/generative-ai

- react
- react-dom
- react-hook-form
- @radix-ui/- react-* (various UI components)
- framer-motion
- recharts
- tailwindcss
- lucide-react

- @neondatabase/serverless
- connect-pg-simple
- memorystore

  
## Software Versions
- Node.js: v18+
- npm: Comes with Node.js
- Python: v3.9+ (if applicable)
- PostgreSQL: Latest stable version
- Git: Latest stable version (optional)




## 1. Clone the Repository

If you haven't already cloned the repository, run:
- ``` git clone https://github.com/devanshgargofficial/smart-bin-tracker.git```
- ``` cd smart-bin-tracker```
<!-- 
git clone https://github.com/your-username/your-repository.git
cd your-repository
git clone https://github.com/devanshgargofficial/SmartBinTracker

cd SmartBinTracker
-->
## 2. Install Dependencies from root
   ```npm install```

## 3. Configure Environment Variables

Create a .env file in the root directory and add the necessary configurations as mentioned in .env.example file.
/*GEMINI_API_KEY*/
### Getting the GEMINI_API_KEY

1. Go to Google AI Studio.
2. Sign in with your Google account.
3. Navigate to the API key section.
4. Generate a new API key and copy it.
5. Paste it into your .env file under GEMINI_API_KEY.

## 4. Start the Application
   ```npm run dev```

## 5. Access the Application

- Open your browser and visit: ```http://localhost:5000``` (for user/citizen)
- Open your browser and visit: ```http://localhost:5000/admin``` (for admin view)

## 6. Running in Production (Optional)
   run commands:
   ```
   npm install
   npm run build
   npm run start
   ```
