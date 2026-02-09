// supabase/functions/payment-sheet/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    apiVersion: '2022-11-15',
})

serve(async (req) => {
    // CORS Headers for your frontend
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 1. Receive Booking Details (NOT price)
        // Note: Angular HttpClient might send body differently, but req.json() should parse standard JSON body
        const { ratePlanId, checkIn, checkOut, guestEmail } = await req.json()

        // 2. Initialize Supabase Client
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // 3. SECURITY CHECK: Ask Database for the TRUE price and availability
        const { data: quote, error: dbError } = await supabaseClient
            .rpc('get_booking_quote', {
                p_rate_plan_id: ratePlanId,
                p_check_in: checkIn,
                p_check_out: checkOut
            })
            .single()

        if (dbError) throw new Error(`Database error: ${dbError.message}`)

        // 4. Fail if Room is sold out or Price is invalid
        if (!quote.is_available) {
            return new Response(JSON.stringify({ error: 'Room is no longer available.' }), {
                status: 409, // Conflict
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // 5. Create Stripe PaymentIntent
        // We store the booking details in 'metadata' so the Webhook can read them later
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(quote.total_price * 100), // Convert to cents
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
                ratePlanId,
                checkIn,
                checkOut,
                guestEmail,
                type: 'hotel_booking' // Tag for your webhook handler
            }
        })

        // 6. Return the Client Secret to Frontend
        return new Response(
            JSON.stringify({
                clientSecret: paymentIntent.client_secret,
                verifiedPrice: quote.total_price
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
