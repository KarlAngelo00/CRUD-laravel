import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  // State to manage product details from the form
  const [product, setProduct] = useState({
    barcode: '',      // Barcode of the product
    description: '',  // Product description
    price: '',        // Product price
    quantity: '',     // Available quantity of the product
    category: '',     // Product category
  });
  
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages
  const navigate = useNavigate(); // Used to redirect the user after adding the product

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    // Validate the form data (simple validation)
    if (!product.barcode || !product.description || !product.price || !product.quantity || !product.category) {
      setError('All fields are required!');
      return;
    }

    try {
      // Sending a POST request to the '/api/products' endpoint to add a new product
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),  // Sending product details as JSON
      });

      // If the request is successful, navigate to the product list page
      if (response.ok) {
        setSuccess('Product added successfully!');
        setError('');
        setTimeout(() => {
          navigate('/products');
        }, 1500);
      } else {
        // Handle non-200 responses
        const errorData = await response.json();
        setError(`Error: ${errorData.message || 'Failed to add product'}`);
      }
    } catch (error) {
      // Catch network or other errors
      setError('Error adding product. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Add Product</h2>

      {/* Display success message */}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Display error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Field to input product barcode */}
        <Form.Group className="mb-3">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            value={product.barcode}
            onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
            required
          />
        </Form.Group>

        {/* Field to input product description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
        </Form.Group>

        {/* Field to input product price */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"  // Allow decimals for price
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </Form.Group>

        {/* Field to input product quantity */}
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            required
          />
        </Form.Group>

        {/* Field to input product category */}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          />
        </Form.Group>

        {/* Submit button to add product */}
        <Button variant="primary" className="mt-3" type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
