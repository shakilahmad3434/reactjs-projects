# HolidaysApp

HolidaysApp is a React-based web application that allows users to search for public holidays by country and date using the Calendarific API.

![Holidays App Home Preview](./public/holidaysapp%20homepage.png)
![Holidays App Result Preview](./public/holidaysapp%20result.png)

## Features

- Fetch public holidays for a selected country and year.
- Optional filters for month and day.
- Dynamic country selection from an API.
- Interactive and user-friendly UI.

## Technologies Used

- React.js
- Tailwind CSS
- Calendarific API

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/HolidaysApp.git
   ```

2. Navigate to the project directory:

   ```sh
   cd HolidaysApp
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add your API key:

   ```sh
   VITE_API_KEY=your_calendarific_api_key
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

## Usage

1. Select a country from the dropdown.
2. Choose a year (default is the current year).
3. Optionally, select a month and/or day.
4. Click on **Find Holidays** to fetch the results.


## API Reference

HolidaysApp uses the **Calendarific API** to fetch holiday data. Visit [Calendarific](https://calendarific.com/) to get your free API key.

## License

This project is open-source and available under the [MIT License](LICENSE).

