import React, { useState } from 'react';
import Select from 'react-select';
import './../../styles/ProductCreate.css';
import { Category } from '@mui/icons-material';

const ProductCreate = () => {
  const [selectedAttributes, setSelectedAttributes] = useState();
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    category: '',
    attributes: [{ id: 1, attribute: '', choices: [] }],
    variants: [{ id: 1, name: '', price: '', quantity: '', image: '', variantAttributes: [] }],
  });

  const attributes = [
    {
      id: 1,
      label: "Color",
      value: "color",
      name: "color",
      choices: [
        { id: 1, name: "red" },
        { id: 2, name: "blue" },
        { id: 3, name: "black" }
      ]
    },
    {
      id: 2,
      label: "Size",
      value: "size",
      name: "size",
      choices: [
        { id: 1, name: "large" },
        { id: 2, name: "medium" },
        { id: 3, name: "small" }
      ]
    }
  ];

  // const handleVariantChange = (index, key, value) => {
  //   const updatedVariants = [...productData.variants];
    
  //   if (key === 'image' && value) {
  //     updatedVariants[index][key] = value;
  //   } else {
  //     updatedVariants[index][key] = value;
  //   }
  
  //   setProductData({ ...productData, variants: updatedVariants });
  // };

  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...productData.variants];
    
    if (key === 'image' && value) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        updatedVariants[index][key] = imageData;
        setProductData({ ...productData, variants: updatedVariants });
      };
      reader.readAsDataURL(value);
    } else {
      updatedVariants[index][key] = value;
      setProductData({ ...productData, variants: updatedVariants });
    }
  };
  
  

  const isKeyPresent = (list, key) => {
    for (const obj of list) {
      if (obj.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  };

  const handleVariantAttributesChange = (index, aidx, key, value) => {
    const updatedVariants = [...productData.variants];
    if (isKeyPresent(updatedVariants[index]["variantAttributes"], key)) {
      updatedVariants[index]["variantAttributes"][key] = value;
    } else {
      updatedVariants[index]["variantAttributes"].push({ [key]: value })
    }
    setProductData({ ...productData, variants: updatedVariants });
  };

  const addVariant = () => {
    const newVariant = { id: Date.now(), name: '', price: '', quantity: '', image: '', variantAttributes: [] };
    setProductData({
      ...productData,
      variants: [...productData.variants, newVariant],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login submit")
    const url = 'http://127.0.0.1:8000/api/products/create-product/';
    fetch(`${url}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("log-in");
        console.log('Fetched Data:', data);
        // navigate('/dashboard/default');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const selectAttributesChange = (e) => {
    console.log("value: ", e);
  };

  const handleChange = (newValue, actionMeta) => {
    if (actionMeta.action == "clear" || actionMeta.action == "remove-value") {
      setSelectedAttributes(null);
    } else {
      setSelectedAttributes(newValue);
    }
  };

  const deleteVariant = (id) => {
    const updatedVariants = productData.variants.filter((variant) => variant.id !== id);
    setProductData({
      ...productData,
      variants: [...updatedVariants],
    });
  };

  return (
    <div className="container slider-one-active">
      <form className="product-create-form" onSubmit={handleSubmit}>
        <h3>General Information</h3>
        <h2>Create Product</h2>
        <input
          id="title"
          placeholder="Enter Product Title"
          type="text"
          value={productData.title}
          onChange={(e) => setProductData({ ...productData, title: e.target.value })}
        />
        <textarea
          rows="4"
          cols="50"
          type="textarea"
          placeholder="Enter Product Description"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
        />
        <small className="input-desc">Give your product a short and clear description.</small>
        <br />
        <br />
        <select onChange={(e) => setProductData({ ...productData, category: e.target.value })}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Automotive">Automotive</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <p>Select Product Attributes to add variants</p>
        <Select
          isMulti
          isClearable
          name="attributes"
          options={attributes}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
        />
        <br />

        <h3>Variants:</h3>
        {selectedAttributes && selectedAttributes.length ? productData.variants.map((variant, index) => (
          <div key={index} className='variant'>
            <input
              type="text"
              placeholder="Name"
              value={variant.name}
              onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Price"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
            />
            <input
              type="text"
              placeholder="Quantity of each Variants (in units)"
              value={variant.quantity}
              onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
            />
            {selectedAttributes.map((attribute, attributeIndex) => (
              <div key={attributeIndex}>
                <label>{attribute.name}: </label>
                <select onChange={(e) => handleVariantAttributesChange(index, attribute.id, attribute.name, e.target.value)}>
                  <option value="">Select {attribute.attribute}</option>
                  {attribute.choices.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleVariantChange(index, 'image', e.target.files[0])}
            />
            {
              variant.image &&
              <img src={variant.image} alt="Variant" height="200" width="200" />
            }
            {productData.variants.length > 0 && (
              <>
                <button type="button" onClick={() => deleteVariant(variant.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        )) : (<p>Select attributes to add variants</p>)}

        {selectedAttributes && selectedAttributes.length > 0 && (<button type="button" onClick={addVariant}>
          Add Variant
        </button>)}
        <br /><br />
        
        <div className='submit-button'>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ProductCreate;
