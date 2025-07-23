# 🛒 Price Comparison Web Application

A modern, responsive web application that helps users compare product prices across multiple e-commerce platforms. Built with React and Node.js, this tool provides real-time price comparisons to help users find the best deals.

![Project Status](https://img.shields.io/badge/Status-Production-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🌟 Features

- **🔍 Smart Product Search**: Intelligent search functionality with real-time results
- **💰 Price Comparison**: Compare prices across multiple retailers and platforms
- **🏷️ Deal Detection**: Automatic discount calculation and offer display
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Loading**: Efficient API calls with loading states and error handling
- **🔄 Pagination**: Smooth navigation through large product catalogs
- **🎯 Direct Purchase**: One-click redirection to retailer websites
- **🚀 Real-time Updates**: Live price and availability information

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **CSS3** - Custom styling with responsive design
- **JavaScript ES6+** - Modern JavaScript features

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **Cheerio** - Server-side HTML parsing
- **CORS** - Cross-origin resource sharing

### Deployment

- **Vercel** - Serverless deployment platform
- **Custom Domain** - Production-ready setup

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd price-comparison-web
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Development Servers**

   **Backend** (Terminal 1):

   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:10000
   ```

   **Frontend** (Terminal 2):

   ```bash
   cd frontend
   npm start
   # App runs on http://localhost:3000
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
price-comparison-web/
├── backend/                 # Node.js/Express API server
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   ├── vercel.json         # Deployment configuration
│   └── flipkartDemo.html   # Demo file
├── frontend/               # React application
│   ├── public/             # Static files
│   ├── src/
│   │   ├── component/      # Reusable React components
│   │   │   ├── navbar/     # Navigation component
│   │   │   ├── itemContainer/ # Product display
│   │   │   ├── searchBox/  # Search functionality
│   │   │   ├── loader/     # Loading indicators
│   │   │   ├── paginationBox/ # Page navigation
│   │   │   ├── footer/     # Footer component
│   │   │   └── ...         # Other components
│   │   ├── assets/         # Images and static assets
│   │   ├── style/          # CSS stylesheets
│   │   ├── App.js          # Main React component
│   │   └── index.js        # React entry point
│   ├── package.json        # Frontend dependencies
│   └── README.md           # React-specific documentation
└── README.md               # Project documentation
```

## 🔧 API Documentation

### Base URL

- **Production**: `https://api-comparison.bhemu.me/`
- **Development**: `http://localhost:10000/`

### Endpoints

#### Search Products

```http
GET /?search={query}&page={page}
```

**Parameters:**

- `search` (required): Search query string
- `page` (optional): Page number for pagination (default: 1)

**Response:**

```json
{
  "data": [
    {
      "id": "product_id",
      "title": "Product Name",
      "source_price": "999",
      "source_mrp": "1299",
      "discount": "23",
      "image": "image_url",
      "offers": ["offer1", "offer2"],
      "source_icon": "retailer_logo_url",
      "source_name": "Retailer Name"
    }
  ]
}
```

#### Get Product URL

```http
GET /product/{productId}
```

**Parameters:**

- `productId` (required): Unique product identifier

**Response:**

```json
{
  "status": 200,
  "productUrl": "https://retailer.com/product-url"
}
```

## 🎨 Components Overview

### Core Components

- **`Navbar`** - Navigation bar with search functionality
- **`ItemContainer`** - Individual product card display
- **`SearchBox`** - Main search interface for homepage
- **`PaginationBox`** - Navigation between result pages
- **`Loader`** - Loading animation during API calls
- **`LoadingDialog`** - Modal loading indicator
- **`EmptyCart`** - No results found state
- **`ShowMsg`** - Toast notifications and messages
- **`FootBar`** - Application footer

## 🌐 Live Demo

- **Website**: [https://comparison.bhemu.me/](https://comparison.bhemu.me/)
- **Alternative**: [https://price-comparison-web.vercel.app/](https://price-comparison-web.vercel.app/)

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
cd frontend
npm run build
# Deploy to Vercel or your preferred platform
```

### Backend Deployment (Vercel)

The backend is configured for Vercel deployment with the included `vercel.json` file.

### Environment Variables

Update the API base URL in `frontend/src/App.js`:

```javascript
const apiBaseUrl = "your-api-endpoint/";
```

### CORS Configuration

Update the allowlist in `backend/index.js` for your domains:

```javascript
const allowlist = ["https://your-domain.com/", "http://localhost:3000/"];
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔍 Features in Detail

### Search Functionality

- Real-time product search across multiple platforms
- Intelligent query processing and result filtering
- Pagination support for large result sets

### Price Comparison

- Side-by-side price comparison from different retailers
- Automatic discount calculation and display
- Special offers and deals highlighting

### User Experience

- Fast, responsive interface
- Loading states and error handling
- Mobile-optimized design
- Accessibility considerations

### Performance

- Efficient API calls with caching
- Lazy loading for images
- Optimized bundle size
- Server-side rendering ready

## 🐛 Known Issues & Limitations

- First API call may take longer on free hosting platforms
- Limited to products available through the price comparison API
- Some retailer websites may have anti-bot measures

## 👨‍💻 Author

**Adarsh Suman**

## 🙏 Acknowledgments

- Price data provided by pricee.com API
- Icons and images from various sources
- React community for excellent documentation and resources

---

**⭐ If you found this project helpful, please give it a star!**
