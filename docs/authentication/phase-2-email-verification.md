# Phase 2 — Email Verification

## Objective

Implement the email verification flow, including deep linking from email, handling verification callbacks, detecting verified users, resending verification emails, and providing a clear UX for pending verification.

## Features to Implement

- [ ] Email verification pending screen
- [ ] Deep link handler for verification callback URLs
- [ ] Detect and update verified user state
- [ ] Resend verification email functionality
- [ ] Handle expired or invalid verification links
- [ ] Auto-redirect after successful verification
- [ ] Session creation from verification tokens

## Technical Approach

### 1. Verification Flow

```
Sign Up → Supabase sends confirmation email → User clicks link →
  ├─ Deep link opens app: elite://#access_token=...&refresh_token=...
  ├─ App extracts tokens from URL
  ├─ Calls supabase.auth.setSession({ access_token, refresh_token })
  └─ Redirects to home (authenticated)
```

### 2. Token Extraction from Deep Link

```ts
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw error;
  return data.session;
};
```

### 3. Listen for Deep Links

```ts
import * as Linking from "expo-linking";

export function useAuthDeepLink() {
  useEffect(() => {
    const listener = Linking.addEventListener("url", ({ url }) => {
      if (url.includes("access_token")) {
        createSessionFromUrl(url);
      }
    });

    // Check if app was opened from a deep link
    Linking.getInitialURL().then((url) => {
      if (url?.includes("access_token")) {
        createSessionFromUrl(url);
      }
    });

    return () => listener.remove();
  }, []);
}
```

## UI Screens Involved

### Verification Pending Screen (`src/app/verify-email.tsx`)

**Layout:**
- "ELITE" brand text (centered)
- Email/letter icon (illustration)
- "Check your email" heading
- "We sent a verification link to **{email}**" message
- "Resend email" button (secondary style)
- "Didn't receive it? Check your spam folder" helper text
- "Back to Sign In" link
- Auto-check timer (polls for verification status)

### Verification Callback (No UI)

The deep link handler runs in the background when the app is opened via `elite://` scheme. It extracts tokens and creates a session, then redirects to the appropriate screen.

## Navigation Flow

```
signup.tsx → success → verify-email.tsx (pending state)
                          │
                          ├─ User clicks verification link in email
                          │   └─ Deep link → extract tokens → setSession → /(tabs)
                          │
                          ├─ Resend email → supabase.auth.resend()
                          │
                          └─ "Back to Sign In" → /login
```

### Deep Link URL Formats

Supabase verification links come in these formats:

```
// Classic format
elite://#access_token=eyJ...&expires_at=...&expires_in=...&refresh_token=...&token_type=bearer&type=signup

// PKCE format (newer)
elite://?code=...
```

## Supabase Configuration

### Required Settings

1. **Authentication → Providers → Email**:
   - "Confirm email": **ON**
   - "Secure email change": **ON** (recommended)

2. **Authentication → Settings → Redirect URLs**:
   - Add: `elite://`
   - This is where Supabase redirects after email verification

3. **Email Templates → Confirm signup**:
   - Customize the email template
   - Ensure the link includes `{{ .ConfirmationURL }}`
   - The confirmation URL will redirect to your deep link scheme

### How the Confirmation URL Works

When Supabase sends a confirmation email, it generates a URL like:

```
https://miguagxwnorpktlgizyv.supabase.co/auth/v1/verify?token=...&type=signup&redirect_to=elite://
```

After Supabase verifies the token, it redirects to:

```
elite://#access_token=...&refresh_token=...
```

This deep link opens your app, and the handler extracts the tokens.

## State Management

### Zustand Auth Store Updates

```ts
// After successful verification:
authStore.setUser(session.user);
authStore.setSession(session);
authStore.setInitialized(true);
```

### Verification Polling (Optional)

For better UX, poll the session status while the user is on the pending screen:

```ts
useEffect(() => {
  const interval = setInterval(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.replace("/(tabs)");
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);
```

## Validation Requirements

### Verification Link Validation

- Token must be present in the deep link URL
- Token must not be expired
- Token type must be `signup`

### Resend Email Validation

- Rate limit: Supabase allows 1 resend per 60 seconds
- Show cooldown timer on the resend button
- Display success message after resend

## Error Handling

### Invalid/Expired Link

| Scenario | Handling |
|----------|----------|
| Missing tokens | Show "Invalid verification link" error |
| Expired token | Show "Link expired. Please request a new one." |
| Already verified | Redirect to login with "Email already verified" message |
| Network error | Show "Connection failed. Please try again." |

### Error States

```ts
// Verification callback errors
if (errorCode) {
  setError("Invalid verification link. Please request a new one.");
  return;
}

if (error) {
  setError("Failed to verify email. Please try again.");
  return;
}
```

## Edge Cases

1. **User clicks link on different device** → Verification works, but session is created on that device; user must log in on original device
2. **User already verified** → Redirect to login with info message
3. **User closes app before clicking link** → Link remains valid for Supabase's configured duration (default: 24 hours)
4. **User requests multiple resend** → Rate limited by Supabase; show cooldown
5. **Deep link opens app but user logged out** → Create session, then redirect to home
6. **Deep link opens app but user already logged in** → Ignore tokens, redirect to home
7. **Token format changes** → Use `QueryParams.getQueryParams()` which handles multiple formats
8. **App killed and reopened from link** → `Linking.getInitialURL()` catches it on mount

## Testing Checklist

- [ ] Verification pending screen displays correctly
- [ ] Email address is shown in the message
- [ ] Resend button works and shows cooldown
- [ ] Deep link opens app and extracts tokens
- [ ] Session is created from verification tokens
- [ ] User is redirected to home after verification
- [ ] Invalid link shows error message
- [ ] Expired link shows error with resend option
- [ ] Already verified user is redirected to login
- [ ] Polling detects verification and auto-redirects
- [ ] "Back to Sign In" navigates to login
- [ ] Works on both iOS and Android
- [ ] Works when app is killed and opened from email link
- [ ] Works when app is in background and opened from email link

## Definition of Done (DoD)

- [ ] Verification pending screen is shown after sign up
- [ ] Deep link handler extracts tokens from verification URLs
- [ ] `supabase.auth.setSession()` creates session from tokens
- [ ] User is authenticated after clicking verification link
- [ ] Resend email functionality works
- [ ] Expired/invalid links show appropriate errors
- [ ] Session is restored on app launch if already verified
- [ ] No TypeScript errors
- [ ] Works on iOS and Android
- [ ] Deep linking works from killed state

## Dependencies

- **Required packages**: `expo-auth-session`, `expo-linking` (may need installation)
- **Blocks**: None
- **Depends on**: Phase 1 (Sign Up)
