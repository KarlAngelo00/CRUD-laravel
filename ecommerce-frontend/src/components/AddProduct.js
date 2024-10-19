import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  //State to manage product details from the form
  const [product, setProduct] = useState({
    barcode: '',      //Barcode of the product
    description: '',  //Product description
    price: '',        //Product price
    quantity: '',     //Available quantity of the product
    category: '',     //Product category
  });
  
  const navigate = useNavigate();  //Used to redirect the user after adding the product

  //Function to handle form submission
  const handleSubmit = async () => {
    //Sending a POST request to the '/api/products' endpoint to add a new product
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),  //Sending product details as JSON
    });

    //If the request is successful, navigate to the product list page
    if (response.ok) {
      navigate('/products');
    } else {
      // Alert the user if there is an error
      alert('Error adding product');
    }
  };

  return (
    <Container>
      <h2>Add Product</h2>
      <Form>
        {/*Field to input product barcode*/}
        <Form.Group className="mb-3">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            value={product.barcode}
            onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
          />
        </Form.Group>

        {/*Field to input product description*/}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </Form.Group>

        {/*Field to input product price*/}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Group>

        {/*Field to input product quantity*/}
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          />
        </Form.Group>

        {/*Submit button to add product*/}
        <Button variant="primary" className="mt-3" onClick={handleSubmit}>Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
