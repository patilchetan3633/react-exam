import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productList.css";
import { fetchProduct, addProduct, deleteProduct, updateProduct } from "../slices/productslice";

function ProductList() {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.product);

    const [form, setForm] = useState({ title: "", category: "", price: "" });
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            dispatch(updateProduct({ id: editId, data: form }));
            setEditId(null);
        } else {
            dispatch(addProduct(form));
        }
        setForm({ title: "", category: "", price: "" });
    };

    const handleEdit = (p) => setForm({ title: p.title, category: p.category, price: p.price }) || setEditId(p.id);
    const handleDelete = (id) => window.confirm("Delete this product?") && dispatch(deleteProduct(id));

    const filteredList = list.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || p.category === filterCategory)
    );

    const categories = ["All", ...new Set(list.map(p => p.category))];

    return (
        <div className="product-container">
            <h2>Products</h2>

            {/* Search + Filter */}
            <div className="search-filter">
                <input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                    {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Form */}
            <form className="product-form" onSubmit={handleSubmit}>
                <input name="title" placeholder="Product Name" value={form.title} onChange={handleChange} required />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
                <button className={editId ? "update-btn" : "add-btn"} type="submit">
                    {editId ? "Update" : "Add"}
                </button>
            </form>

            {loading && <p className="loading-text">Loading...</p>}

            {/* Product List */}
            <div className="product-grid">
                {filteredList.map(p => (
                    <div className="product-card" key={p.id}>
                        <div>
                            <p className="product-title">{p.title}</p>
                            <p className="product-category">Category: {p.category}</p>
                            <p className="product-price">₹{p.price}</p>
                        </div>
                        <div className="card-buttons">
                            <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
