# Placeholder Inc. — DOM Practice Project

A small front-end practice project built with **HTML, CSS, and vanilla JavaScript**.  
The goal of this repo is to practise **DOM manipulation**, **modal popups**, and **consuming an external API** (with content updating on a timed interval).

## Tech Stack

- HTML
- CSS
- JavaScript (vanilla)
- External API: `https://api.chucknorris.io/jokes/random`

## Features

- **Image section interaction**
  - Click the image row to toggle the layout (normal ↔ `row-reverse`).

- **Contact greeting**
  - Enter your name in the Contact input and click **Introduce yourself** to receive a greeting message.
  - Includes a simple empty-input check (adds a red border if nothing is entered).

- **Modal popups (Dashboard cards)**
  - Click **Read the article** on any dashboard card to open a modal.
  - Modal can be closed by:
    - Clicking **Close**
    - Clicking outside the modal content
    - Pressing **Esc**
  - Page scroll is disabled while the modal is open.

- **API-powered jokes/quotes**
  - Fetches a random Chuck Norris joke from an external API.
  - Automatically refreshes on a timed interval and updates the header text.
  - Loading message appears on page if the quote has not yet been received.

## How to Run

### Run Locally Using `npx serve` (recommended)

1. Install Node.js (if you don't have it already)
2. In the project folder, run:

   ```bash
   npx serve
   ```

3. Copy the localhost URL shown in the terminal (for example http://localhost:3000) and paste it into your browser

## Project Structure

```code
.
├── index.html
├── styles.css
├── script.js
└── images/
    ├── lou-batier-5EoWFa_Htdo-unsplash.jpg
    ├── fabian-kozdon-5ZeooCGNw3s-unsplash.jpg
    └── levi-midnight--DApw8eRfR8-unsplash.jpg
```

## Notes

This is a practice project, so functionality is intentionally simple and focused on DOM concepts. There are no tests included for this project.

## Ideas for improvements

- Improve the overall user interface and visual fluidity, including smoother transitions and animations.
- Enhance responsiveness across different screen sizes and devices.
- Store user inputs (such as contact names) in a database instead of handling them only on the client side.
- Add better error handling for API requests.
