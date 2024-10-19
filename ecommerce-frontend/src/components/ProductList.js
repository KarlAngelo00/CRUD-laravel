import React, { useState, useEffect } from 'react';
import { Table, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function ProductList() {
  //State to store the list of products and the search input
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  //Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      //Make a GET request to the '/api/products' endpoint
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data); //Set the response data to the products state
    };
    fetchProducts(); //Invoke the function to fetch products
  }, []);

  //Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    //Container for the product list with custom styles
    <Container style={{ backgroundColor: '#f0f4f1', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h2 style={{ color: '#4b4b4b' }}>Product List</h2>

      {/*Search input field to filter products by description*/}
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
        style={{ borderColor: '#c5c1b4', borderRadius: '8px' }}
      />

      {/*Table to display the list of products*/}
      <Table striped bordered hover className="table" style={{ backgroundColor: '#fffdf5' }}>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*Map over the filtered products to display each one in a table row*/}
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>
                {/*Link to the edit page for each product*/}
                <Link to={`/edit-product/${product.id}`} style={{ color: '#6a8759' }}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;