# Housing Capital NZ - Sovereign Real Estate

A comprehensive housing development and single family home website for New Zealand North Island.

## Overview

Housing Capital NZ is a real estate platform dedicated to showcasing premium single housing properties and development opportunities across New Zealand's North Island. We connect buyers, sellers, and investors with quality residential properties in key markets.

## Features

- 🏡 **Property Listings** - Browse single family homes and development sites
- 🔍 **Advanced Search** - Filter by location, price, bedrooms, and amenities
- 📊 **Market Insights** - Real estate trends and market analysis for NZ North Island
- 💼 **Investment Opportunities** - Housing development projects and investment options
- 📱 **Responsive Design** - Full mobile and desktop support
- 🔐 **Secure Transactions** - Safe buyer-seller communication platform

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: RESTful API
- **Deployment**: (To be specified)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/miatup92-blip/Housing-capital-NZ.git
cd Housing-capital-NZ
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration:
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
```

4. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Housing-capital-NZ/
├── public/              # Static files (CSS, JS, images)
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── views/           # HTML templates
│   └── config/          # Configuration files
├── data/                # JSON data files
├── tests/               # Test files
├── package.json         # Dependencies and scripts
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Usage

### Viewing Properties
- Navigate to the homepage to browse available listings
- Use filters to narrow down by location, price range, and property features
- Click on a property to view detailed information and images

### Creating a Listing
- Register as a real estate agent or property owner
- Login to your dashboard
- Click "Add New Listing" and fill in property details
- Upload photos and set pricing
- Submit for verification

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new listing (authenticated)
- `PUT /api/properties/:id` - Update listing (authenticated)
- `DELETE /api/properties/:id` - Delete listing (authenticated)

### Search
- `GET /api/search?location=&price_min=&price_max=&bedrooms=`

## Contributing

We welcome contributions! Please follow these steps:

1. Create a new branch from `develop`:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git commit -m "Add description of changes"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

4. Submit a Pull Request with a clear description

## Development Guidelines

- Follow the existing code style
- Write unit tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

## Testing

```bash
npm test
```

## Deployment

(Deployment instructions to be added)

## License

This project is licensed under the Unlicense - see the LICENSE file for details.

## Contact

- **Email**: contact@housingcapitalnz.com
- **Website**: (To be published)
- **GitHub**: https://github.com/miatup92-blip/Housing-capital-NZ

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact our support team.

---

**Last Updated**: June 2026
