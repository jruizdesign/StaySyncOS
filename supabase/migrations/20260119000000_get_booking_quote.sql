create or replace function get_booking_quote(
  p_rate_plan_id uuid,
  p_check_in date,
  p_check_out date
)
returns table (
  total_price decimal,
  is_available boolean
)
language plpgsql
as $$
declare
  v_room_type_id uuid;
  v_price decimal;
  v_available boolean;
begin
  -- 1. Get the room_type_id from the rate plan
  select room_type_id into v_room_type_id 
  from rate_plans where id = p_rate_plan_id;

  -- 2. Calculate the Price (Sum of calendar rates or base price)
  select sum(coalesce(cr.price_amount, rt.base_price))
  into v_price
  from generate_series(p_check_in, p_check_out - 1, '1 day') as d(day_date)
  join room_types rt on rt.id = v_room_type_id
  join rate_plans rp on rp.id = p_rate_plan_id
  left join calendar_rates cr on cr.rate_plan_id = rp.id and cr.specific_date = d.day_date;

  -- 3. Check Availability (Overlap check)
  select (count(r.id) - count(b.id)) > 0
  into v_available
  from room_types rt
  left join rooms r on rt.id = r.room_type_id
  left join bookings b on rt.id = b.room_type_id 
    and b.status != 'cancelled'
    and b.stay_range && daterange(p_check_in, p_check_out, '[)')
  where rt.id = v_room_type_id
  group by rt.id;

  return query select v_price, coalesce(v_available, false);
end;
$$;
