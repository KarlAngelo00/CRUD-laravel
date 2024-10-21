import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function EditProduct() {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  // State to store the product details
  const [product, setProduct] = useState({
    description: '',
    price: '',
    quantity: '',
    category: ''
  });

  // Fetch product details on mount
  useEffect(() => {
    // Imagine a magic fetch from the database
    const fetchProduct = async () => {
      const productData = {
        id: 1, 
        barcode: '123456789', 
        description: 'Apple', 
        price: 1.5, 
        quantity: 100, 
        category: 'Fruits'
      };
      setProduct(productData);
    };
    fetchProduct();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Imagine this is the point where magic happens (updating the database)
    const updatedProduct = {
      ...product,
      price: parseFloat(product.price), // Ensure price is a number
      quantity: parseInt(product.quantity) // Ensure quantity is a number
    };

    console.log("Product updated:", updatedProduct);

    // Redirect to product list page after saving
    navigate('/product-list');
  };

  return (
    <Container>
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        {/* Description */}
        <Form.Group controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Price */}
        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
          />
        </Form.Group>

        {/* Quantity */}
        <Form.Group controlId="formProductQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
