import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function ProductDetail() {
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Fetch product details on mount
  useEffect(() => {
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

  // Function to handle product deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        // Imagine this sends a request to your database to delete the product
        console.log("Product deleted:", id);

        // After deleting, navigate back to the product list
        navigate('/product-list');
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <Container>
      <h2>Product Detail</h2>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Category:</strong> {product.category}</p>

      {/* Delete Button */}
      <Button variant="danger" onClick={handleDelete}>
        Delete Product
      </Button>
    </Container>
  );
}

export default ProductDetail;
