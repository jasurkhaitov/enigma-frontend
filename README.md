# Enigma

Enigma is a powerful document translation and comparison tool designed to ensure accurate translations between **English** and **Uzbek**. It allows users to upload DOCX files, compare translations, and translate documents seamlessly.

## 🚀 Features

### 🔍 Document Comparison
- Upload two DOCX files (one in English, one in Uzbek) to compare translations.
- Detects discrepancies and highlights incorrect or missing translations.

### 🌍 Translation Tool
- Translate DOCX documents between **English** and **Uzbek** efficiently.
- Uses an intelligent translation system to preserve document formatting.

### 📜 User-Friendly Interface
- **History Page**: Track and manage your uploaded documents.
- **Authentication System**: Secure login and session management.
- **Consumer Terms, Privacy Policy, and Usage Policy Pages**.

## 🛠️ Tech Stack

### Frontend:
- **React** with **Redux Toolkit** & **React Query** for state management and API caching.
- **Tailwind CSS** for modern, responsive UI.

### Backend:
- **Deno** for a fast and secure backend environment.
- **REST API** for seamless communication between frontend and backend.

### Authentication:
- **JWT-based authentication** with refresh token stored in **HTTP-only cookies**.

## 📂 Project Structure
```
📦 enigma
├── 📁 frontend       # React-based frontend
│   ├── 📁 components # Reusable UI components
│   ├── 📁 pages      # Page components (Login, History, Terms, etc.)
│   ├── 📁 services   # API calls using React Query
│   └── 📁 store      # Redux Toolkit store & slices
├── 📁 backend        # Deno-based backend
│   ├── 📁 routes     # API endpoints
│   ├── 📁 controllers # Business logic for requests
│   ├── 📁 models     # Database models & schemas
│   ├── 📁 middleware # Authentication & validation
└── README.md         # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** & **pnpm** (for frontend)
- **Deno** (for backend)

### Backend Setup
```sh
git clone https://github.com/yourusername/enigma.git
cd enigma/backend
deno run --allow-net --allow-read server.ts
```

### Frontend Setup
```sh
cd enigma/frontend
pnpm install
pnpm dev
```

## 🔄 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/upload` | Uploads DOCX file for translation/comparison |
| `GET`  | `/task/:id` | Fetches translation/comparison task status |
| `POST` | `/translate` | Translates a DOCX file |
| `POST` | `/auth/login` | User authentication |

## 🚧 Future Improvements
- **AI-powered translation improvements**.
- **Additional language support**.
- **Enhanced real-time collaboration features**.

## 🤝 Contributing
We welcome contributions! Feel free to submit a pull request or open an issue.

## 📜 License
This project is licensed under the **MIT License**.

---

💡 *Enigma – Making document translation seamless and accurate!*