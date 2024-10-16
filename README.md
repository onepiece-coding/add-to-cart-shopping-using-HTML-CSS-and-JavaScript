# Add To Cart Shopping using HTML, CSS, and JavaScript

This is a simple shopping cart application built using HTML, CSS, and JavaScript. It demonstrates the core concepts of adding products to a cart, updating quantities, and calculating the total price. The project also uses `json-server` to simulate a backend API for fetching product data.

## Demo

[Insert a link to a live demo or a GIF/screenshot of your project]

## Features

- Display a list of products.
- Add products to the cart.
- Remove products from the cart.
- Update product quantities.
- Display the total price of products in the cart.
- Uses `json-server` to simulate product data fetching.

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla JS)
- [json-server](https://www.npmjs.com/package/json-server)

## Getting Started

To get a local copy of this project up and running, follow these simple steps:

### Prerequisites

Make sure you have Node.js installed on your system. If not, download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/onepiece-coding/add-to-cart-shopping-using-HTML-CSS-and-JavaScript.git
   
2. Navigate to the project directory:

  ```bash
  cd add-to-cart-shopping-using-HTML-CSS-and-JavaScript
  ````

3. Install json-server globally (if not already installed):

  ```bash
  npm install -g json-server
  ```

4. Start the json-server:

  ```bash
  json-server --watch db.json
  ```

This will start a local server at http://localhost:3000 serving the data from db.json.

5. Open index.html in your browser to see the project in action:
   
  ```bash
  open index.html
  ```

### Project Structure

├── index.html        # Main HTML file <br />
├── style.css         # Styles for the project <br />
├── script.js         # Main JavaScript  <br />
├── db.json           # JSON file for `json-server` to simulate backend data <br />
├── README.md         # Project documentation

### Usage

- Start the json-server to serve the product data from db.json.
- Open index.html in your browser.
- You will see a list of products fetched from json-server.
- Click on the "Add to Cart" button to add products to your cart.
- Adjust the quantities or remove products from the cart.
- The total price will automatically update based on your cart contents.
  
### Customization

- To change the product data, edit the db.json file.
- Customize the styles by modifying style.css.
- Update the JavaScript logic as needed in script.js.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

### Acknowledgments

- [json-server](https://www.npmjs.com/package/json-server) for providing an easy way to mock REST APIs.
