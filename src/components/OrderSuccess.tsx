const OrderSuccess = ({ orderId, onContinue }: { orderId: string; onContinue?: () => void }) => {
  return (
    <div>
      <h2>Thank you for your order!</h2>
      <p>Your order id is: <strong>{orderId}</strong></p>
      <p>We will send you a confirmation email shortly.</p>
      {onContinue && <div style={{ marginTop: 8 }}><button onClick={onContinue}>Continue shopping</button></div>}
    </div>
  );
};

export default OrderSuccess;
