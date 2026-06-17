# Digital Clock - Multiple Time Zones

A beautiful, responsive digital clock application that displays the current time across multiple time zones simultaneously.

## Features

✨ **Core Features:**
- 🕐 Real-time digital clock display updating every second
- 🌍 Support for 20+ major world timezones
- 📅 Current date display for each timezone
- 🔄 Easy timezone switching and management
- 12/24 hour format toggle
- 🎨 Modern, responsive design with beautiful UI
- 📱 Mobile-friendly layout
- ⚡ Smooth animations and transitions

## How to Use

1. **Open the Application**
   - Open `index.html` in a web browser

2. **Add Time Zones**
   - Click "Add Time Zone" button
   - Search for your desired timezone
   - Click to add it to the display

3. **Toggle Time Format**
   - Click "Toggle 24H/12H" to switch between 24-hour and 12-hour formats

4. **Remove Time Zones**
   - Click the × button on any timezone card to remove it

5. **Default Timezones**
   - The app loads with 6 default timezones:
     - New York (America/New_York)
     - London (Europe/London)
     - Tokyo (Asia/Tokyo)
     - Sydney (Australia/Sydney)
     - Dubai (Asia/Dubai)
     - Los Angeles (America/Los_Angeles)

## Available Timezones

The app includes support for these major timezones:

- **Americas:**
  - America/Anchorage (UTC-9)
  - America/Los_Angeles (UTC-8)
  - America/Denver (UTC-7)
  - America/Chicago (UTC-6)
  - America/New_York (UTC-5)
  - America/Caracas (UTC-4)
  - America/Argentina/Buenos_Aires (UTC-3)

- **Europe:**
  - Europe/London (UTC+0)
  - Europe/Paris (UTC+1)
  - Europe/Berlin (UTC+1)
  - Europe/Moscow (UTC+3)

- **Asia:**
  - Asia/Dubai (UTC+4)
  - Asia/Kolkata (UTC+5:30)
  - Asia/Bangkok (UTC+7)
  - Asia/Hong_Kong (UTC+8)
  - Asia/Shanghai (UTC+8)
  - Asia/Tokyo (UTC+9)

- **Oceania:**
  - Australia/Sydney (UTC+10)
  - Pacific/Auckland (UTC+12)

## Technical Details

### Files Structure
```
digital-clock/
├── index.html      # HTML structure
├── styles.css      # Responsive styling
└── clock.js        # Clock logic and timezone management
```

### JavaScript Classes

**TimezoneManager Class**
- Manages clock displays and timezone operations
- Handles real-time updates
- Manages timezone addition/removal
- Provides time formatting options

### Key Methods

```javascript
// Constructor - Initializes the app
constructor()

// Setup event listeners for UI interactions
setupEventListeners()

// Render clock cards for all timezones
renderClocks()

// Create individual clock card element
createClockCard(timezone, index)

// Update specific clock card
updateClockCard(timezone, index)

// Update all clock cards
updateAllClocks()

// Toggle between 12/24 hour format
toggleTimeFormat()

// Open timezone selection modal
openTimezoneModal()

// Close timezone selection modal
closeTimezoneModal()

// Add new timezone to display
addTimezone(timezone)

// Remove timezone from display
removeTimezone(timezone)

// Filter timezones based on search query
filterTimezones(value)
```

## Browser Compatibility

✅ Chrome 60+
✅ Firefox 55+
✅ Safari 11+
✅ Edge 79+
✅ Mobile browsers

**Note:** Uses Intl.DateTimeFormat API which is supported in all modern browsers

## Responsive Design

- **Desktop:** 3-4 timezone cards per row
- **Tablet:** 2 timezone cards per row
- **Mobile:** 1 timezone card per row

## Styling Highlights

- **Modern Gradient Background:** Purple gradient background
- **Card Design:** Clean white cards with hover effects
- **Typography:** Professional font stack with good readability
- **Colors:**
  - Primary: #667eea (Blue-purple)
  - Secondary: #764ba2 (Purple)
  - Accent: #ff6b6b (Red for delete buttons)

## Performance

- Efficient DOM updates
- Single interval for all clock updates (1 update per second)
- Minimal re-rendering
- Smooth CSS animations

## Customization

### Add Default Timezones

Edit the `this.timezones` array in `clock.js`:

```javascript
this.timezones = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    // Add more here
];
```

### Add More Timezones

Extend the `this.allTimezones` array in the `getAllTimezones()` method:

```javascript
{ name: 'Your/Timezone', offset: 'UTC+X', region: 'City, Country' }
```

### Customize Colors

Edit the CSS variables in `styles.css`:

```css
/* Change gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change primary color */
color: #667eea;
```

## Future Enhancement Ideas

- 🔔 Add alarm/reminder functionality
- 🌡️ Display weather for each timezone
- 💾 Save custom timezone configurations
- 🎨 Multiple theme options
- 🔊 Audio notifications
- 📊 Time difference calculator
- 🌙 Dark mode

## License

Open source - Free to use and modify

## Support

For issues or feature requests, please create an issue in the Housing Capital NZ repository.
