//Sends updated product data to the backend
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    //Fetch product details by ID from /api/products/:id
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    //Send PUT request to /api/products/:id to update product details
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      navigate('/products'); //Redirect on success.
    } else {
      alert('Error updating product');
    }
  };

  return (
    <Container>
      <h2>Edit Product</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </Form.Group>
        <Button onClick={handleSave}>Save Changes</Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
