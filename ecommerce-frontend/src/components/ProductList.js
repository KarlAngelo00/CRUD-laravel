import React, { useState, useEffect } from 'react';
import { Table, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function ProductList() {
  //State to store the list of products and the search input
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter

  // Adding fake product data for testing purposes
  useEffect(() => {
    const fakeData = [
      { id: 1, barcode: '123456789', description: 'Apple', price: 1.5, quantity: 100, category: 'Fruits' },
      { id: 2, barcode: '987654321', description: 'Orange', price: 2.0, quantity: 80, category: 'Fruits' },
      { id: 3, barcode: '543216789', description: 'Milk', price: 3.0, quantity: 50, category: 'Dairy' },
      { id: 4, barcode: '654321987', description: 'Bread', price: 2.5, quantity: 60, category: 'Bakery' },
      { id: 5, barcode: '321654987', description: 'Eggs', price: 4.0, quantity: 120, category: 'Dairy' },
    ];
    setProducts(fakeData);
  }, []);

  // Filter products based on the search term and category filter
  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === '' || product.category === categoryFilter)
  );

  return (
    //Container for the product list with custom styles
    <Container style={{ backgroundColor: '#f0f4f1', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h2 style={{ color: '#4b4b4b' }}>Product List</h2>

      {/* Search input field to filter products by description */}
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
        style={{ borderColor: '#c5c1b4', borderRadius: '8px' }}
      />

      {/* Category filter dropdown */}
      <Form.Select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="mb-3"
        style={{ borderColor: '#c5c1b4', borderRadius: '8px' }}
      >
        <option value="">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
      </Form.Select>

      {/* Table to display the list of products */}
      <Table striped bordered hover className="table" style={{ backgroundColor: '#fffdf5' }}>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the filtered products to display each one in a table row */}
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
              <Link to={`/product-detail/${product.id}`} style={{ color: '#6a8759' }}>
                View Details

              </Link>
                {/* Link to the edit page for each product */}
                <span style={{ marginLeft: '15px' }}></span>
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