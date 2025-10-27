import { MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY } from '../config/env.js';
import { v4 as uuidv4 } from 'uuid';

const express = require('express')
const router = express.Router()

router.post('/create-transaction', authorize, async (req, res) => {
  try {
    const { items,  } = req.body;
    const order_id = `TRX-${uuidv4()}`;

    if (!items || !venue_id || !booking_details) {
        return res.status(400).json({ message: 'Items, venue_id, and booking_details are required.' });
    }

    // Recalculate gross_amount on the backend for security and accuracy
    let calculated_gross_amount = 0;
    const sanitized_items = await Promise.all(items.map(async (item) => {
        const field = await Field.findById(item.id);
        if (!field) {
            throw new Error(`Field with id ${item.id} not found`);
        }
        const item_price = field.price;
        calculated_gross_amount += item_price * item.quantity;
        
        // Truncate item name to meet Midtrans requirements
        const sanitized_name = item.name.length > 50 ? item.name.substring(0, 47) + '...' : item.name;

        return {
            id: String(item.id).substring(0, 50), // Ensure ID is a string and truncated
            price: item_price,
            quantity: item.quantity,
            name: sanitized_name,
        };
    }));

    // Create a single booking with multiple fields
    const newBooking = new Booking({
        order_id: order_id,
        user_id: req.user._id,
        venue_id: venue_id,
        field_id: booking_details.map(detail => detail.field_id),
        booking_date: booking_details[0].date, // Assuming all bookings in a transaction are for the same date
        booking_time: booking_details.map(detail => detail.time).join(', '), // Combine times
        total_price: calculated_gross_amount, // Use the securely calculated amount
        status: 'PENDING'
    });

    await newBooking.save();

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: calculated_gross_amount, // Use calculated amount
      },
      item_details: sanitized_items, // Use sanitized items
      customer_details: {
        first_name: req.user.name,
        email: req.user.email,
      },
      callbacks: {
        finish: `${FRONTEND_URL}/order/status?order_id=${order_id}`
      }
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    res.status(200).json({ token: transactionToken });

  } catch (error) {
    console.error('Midtrans Error:', error);
    res.status(500).json({ message: error.message });
  }
});