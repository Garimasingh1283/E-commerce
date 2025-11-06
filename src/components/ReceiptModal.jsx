// src/components/ReceiptModal.jsx
import React from "react";

const ReceiptModal = ({ form, total, close }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>Order Confirmed 🎉</h3>
        <p>
          Thank you <strong>{form.name}</strong>. A confirmation has been sent to <strong>{form.email}</strong>.
        </p>
        <p className="receipt-total">Total: <strong>₹{total.toLocaleString()}</strong></p>
        <button className="btn btn-primary" onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default ReceiptModal;
