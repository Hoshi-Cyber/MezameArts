# UAT Script – Checkout Flow

## Objective
Validate that a buyer can successfully browse, add artworks to cart, and complete a purchase.

## Preconditions
- User registered as buyer
- At least 1 artwork available

## Steps
1. Log in as buyer
2. Browse artworks and select one
3. Add artwork to cart
4. Proceed to checkout
5. Enter shipping and payment details (use sandbox/test data)
6. Confirm order

## Expected Results
- Artwork appears in cart with correct details
- Checkout calculates totals correctly (price, currency, tax if applicable)
- Payment succeeds using sandbox provider
- Order confirmation email is received
- Order status updates to `paid` in dashboard

## Pass/Fail Criteria
- Pass if all expected results are met without error
- Fail if any step cannot be completed or deviates from expected result
