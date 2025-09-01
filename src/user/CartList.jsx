// src/components/CartList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // 👈 logged-in user

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  // ✅ Fetch cart items
  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`https://smith-server-qpxw.vercel.app/api/cart/${user.id}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log(cartItems,"caaaaartitem");
  

  // ✅ Remove item

  const removeItem = async (productId) => {
    try {
      await axios.delete(`https://smith-server-qpxw.vercel.app/api/cart/${user.id}/${productId}`);
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("❌ Error removing item:", err);
    }
  };

  // ✅ Update qty
  const updateQty = async (productId, qty) => {
    if (qty < 1) return;
    try {
      await axios.put(`https://smith-server-qpxw.vercel.app/api/cart/${user.id}`, {
        productId,
        qty,
      });
      setCartItems(
        cartItems.map((item) =>
          item.productId === productId ? { ...item, qty } : item
        )
      );
    } catch (err) {
      console.error("❌ Error updating qty:", err);
    }
  };

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (loading) return <p className="text-center mt-5">Loading cart...</p>;

  if (!user) return <p className="text-center mt-5">⚠️ Please login to view cart.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>category</th>
                <th>Making Duration</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            
       <tbody>
  {cartItems.map((item) => {
    const totalDuration = item.makingDuration * item.quantity;
    let days;

    if (totalDuration <= 8) {
      days = 1;
    } else if (totalDuration <= 16) {
      days = 2;
    } else if (totalDuration <= 24) {
      days = 3;
    } else if (totalDuration <= 32) {
      days = 4;
    } else if (totalDuration <= 40) {
      days = 5;
    } else {
      days = Math.ceil(totalDuration / 8);
    }

    return (
      <tr key={item.productId}>
        <td>{item.productName}</td>
        <td>{item.category}</td>
        <td>{days} Day{days > 1 ? "s" : ""}</td> {/* ✅ Plural support */}
        {/* <td className="d-block d-md-table-cell">
          <input
            type="number"
            min="1"
            value={item.quantity}
            className="form-control w-50"
            onChange={(e) =>
              updateQty(item.productId, parseInt(e.target.value))
            }
          />
        </td> */}
        <td>{item.quantity}</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeItem(item.productId)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  })}
</tbody>


          </table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* <h4>Total: ₹{totalPrice}</h4> */}
            {/* <button className="btn btn-success">Proceed to order</button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;




//    <tbody>
//   {cartItems.map((item) => (
//     <tr key={item.productId}>
//       <td>{item.productName}</td>
//       <td>{item.category}</td>
//       {/* ✅ Multiply makingDuration by quantity */}
//       <td>{item.makingDuration * item.quantity}</td>
//       <td>
//         <input
//           type="number"
//           min="1"
//           value={item.quantity}
//           className="form-control w-50"
//           onChange={(e) =>
//             updateQty(item.productId, parseInt(e.target.value))
//           }
//         />
//       </td>
//       <td>
//         <button
//           className="btn btn-danger btn-sm"
//           onClick={() => removeItem(item.productId)}
//         >
//           Remove
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>