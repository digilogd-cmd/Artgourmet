import { NextResponse } from 'next/server';

let stripe;
const getStripe = () => {
  if (!stripe) {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'dummy_stripe_secret_key_for_build');
  }
  return stripe;
};

export async function POST(req) {
  try {
    const stripeInstance = getStripe();
    // In a real app, you would pass the user ID and validate the request
    // const body = await req.json();

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Art Gourmet PRO Membership',
              description: 'Unlimited access to all AI Agent products including Somers Live Translator.',
            },
            unit_amount: 999, // $9.99
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/settings?canceled=true`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
