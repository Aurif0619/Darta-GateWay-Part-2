import { Box, Button, Drawer, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../store/slices/cart/cartSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CartList = (props) => {
  const { openCartList, toggleCartList } = props;
  const cartItem = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  const totalPrice = cartItem?.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

  return (
    <Drawer open={openCartList} onClose={toggleCartList(false)}>
      <Box sx={{ width: 320, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Shopping Cart
          </Typography>

          {cartItem?.length > 0 ? (
            cartItem.map((item) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }} key={item.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img width={60} src={item.image} alt={item.title} style={{ borderRadius: '8px', marginRight: '16px' }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {item?.title?.length > 20 ? `${item?.title.slice(0, 20)}...` : item?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.category}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      ${item?.price} <span style={{ fontSize: '0.9rem', color: 'gray' }}>Qty: {item?.quantity}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button onClick={() => dispatch(increaseQuantity({ id: item.id }))} size="small" sx={{ mb: 0.5 }}>
                    <AddCircleOutlineIcon color="primary" />
                  </Button>
                  <Button onClick={() => dispatch(decreaseQuantity({ id: item.id }))} size="small" sx={{ mb: 0.5 }}>
                    <RemoveCircleOutlineIcon color="error" />
                  </Button>
                  <Button onClick={() => dispatch(deleteProduct({ id: item.id }))} size="small">
                    <HighlightOffIcon color="error" />
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
              Your cart is empty.
            </Typography>
          )}
        </Box>

        <Button
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#4CAF50',
          }}
          className='mb-2 mx-1 text-white rounded-4' >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Total:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ${totalPrice}
          </Typography>
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartList;
