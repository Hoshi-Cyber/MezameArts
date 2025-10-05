# UAT Script – KYC Flow

## Objective
Validate that an artist can complete KYC onboarding successfully.

## Preconditions
- User registered as artist
- KYC provider integration active (sandbox mode)

## Steps
1. Log in as artist
2. Navigate to Profile → Verification
3. Upload ID document (test fixture)
4. Upload proof of address (test fixture)
5. Submit verification request

## Expected Results
- Documents are uploaded and validated in correct format
- Verification status shows "pending" after submission
- Within test environment, status auto-updates to "verified" (sandbox rule)
- Artist can now list artworks and request payouts

## Pass/Fail Criteria
- Pass if verification proceeds without error and final status is "verified"
- Fail if documents cannot be uploaded, processed, or status stalls
