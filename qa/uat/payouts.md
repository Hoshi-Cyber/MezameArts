# UAT Script – Payout Flow

## Objective
Validate that an artist can request and receive a payout.

## Preconditions
- Artist verified via KYC
- At least 1 fulfilled order with available balance

## Steps
1. Log in as artist
2. Navigate to Dashboard → Payouts
3. Click "Request payout"
4. Enter payout method (sandbox bank or mobile money)
5. Confirm payout request

## Expected Results
- Payout request is created and status is "pending"
- Notification email sent to artist
- Sandbox provider returns success webhook
- Status updates to "completed" in dashboard
- Balance reduced by payout amount

## Pass/Fail Criteria
- Pass if payout completes and balance reconciles
- Fail if payout cannot be requested, webhook fails, or balance mismatch
