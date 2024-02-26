# 📱 QR Code Generator App

This is a QR Code generator application built with React for the frontend and Express.js for the backend.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm

### 🔧 Installation

1. Clone the repo

```bash
git clone https://github.com/sathiyanarayanan2410/QR-Code-Generator-App.git
cd QR-Code-Generator-App
```

2. Install NPM packages

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:

```properties
PORT=3000
MONOGO_URI=http://localhost:27017/qrcode
JWT_SECRET=your_secret
SESSION_SECRET=your_secret
```

4. Start the server

```bash
npm run dev
```

5. Open the browser and go to http://localhost:3000

## 🎈 Usage

To generate a QR Code, simply enter the text or URL in the input field and click on the 'Generate' button. The QR Code will be displayed below.

## 🛠️ Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Express.js](https://expressjs.com/) - A web application framework for Node.js
- [qrcode](https://www.npmjs.com/package/qrcode) - A QR code generator for JavaScript

## ✍️ Authors

- [@Blank-09](https://www.github.com/Blank-09)
- [@sathiyanarayanan2410](https://www.github.com/sathiyanarayanan2410)
