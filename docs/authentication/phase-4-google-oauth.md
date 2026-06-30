# Phase 4 — Google OAuth

## Objective

Implement Google Sign-In using Supabase OAuth provider, with Expo-compatible authentication flow, proper redirect handling, account linking, error handling, and session persistence.

## Features to Implement

- [ ] Google Sign-In button (matching existing design)
- [ ] OAuth flow using `expo-auth-session` + `expo-web-browser`
- [ ] Deep link redirect handling for OAuth callback
- [ ] Session creation from OAuth tokens
- [ ] Account linking (existing email account → Google sign-in)
- [ ] Error handling for cancelled/failed OAuth
- [ ] Session persistence (already configured)
- [ ] User metadata extraction from Google profile

## Technical Approach

### 1. OAuth Flow

```
User taps "Continue with Google" →
  supabase.auth.signInWithOAuth({ provider: 'google', redirectTo, skipBrowserRedirect: true }) →
  WebBrowser.openAuthSessionAsync(oauthUrl, redirectTo) →
  User completes Google sign-in in browser →
  Browser redirects to: elite://#access_token=...&refresh_token=... →
  App extracts tokens → supabase.auth.setSession() → Authenticated
```

### 2. Supabase OAuth Call

```ts
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

const redirectTo = makeRedirectUri();

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo,
    skipBrowserRedirect: true,
  },
});

// Open in-app browser
const res = await WebBrowser.openAuthSessionAsync(
  data?.url ?? "",
  redirectTo
);

if (res.type === "success") {
  const { url } = res;
  // Extract tokens from URL
  await createSessionFromUrl(url);
}
```

### 3. Token Extraction

```ts
import * as QueryParams from "expo-auth-session/build/QueryParams";

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

### 4. Deep Link Listener

```ts
import * as Linking from "expo-linking";

useEffect(() => {
  const listener = Linking.addEventListener("url", ({ url }) => {
    if (url.includes("access_token")) {
      createSessionFromUrl(url);
    }
  });

  return () => listener.remove();
}, []);
```

## UI Screens Involved

### Login Screen Updates (`src/app/(tabs)/login.tsx` or `src/app/login.tsx`)

**"Continue with Google" button** — already exists as a placeholder. Update to:

1. Call `performOAuth()` on press
2. Show loading state during OAuth flow
3. Handle errors (cancelled, network, etc.)

**Button design (existing):**
- White background, gray border
- Google SVG logo
- "Continue with Google" text
- Full-width, pill-shaped

### No New Screens Required

The OAuth flow uses an in-app browser (WebBrowser), so no new screens are needed in the app.

## Navigation Flow

```
login.tsx → "Continue with Google"
  ├─ Opens in-app browser (WebBrowser)
  ├─ User signs in with Google
  ├─ Browser redirects to elite://
  ├─ App receives deep link
  ├─ Extracts tokens → setSession()
  └─ Redirects to /(tabs) (authenticated)

signup.tsx → "Continue with Google"
  └─ Same flow as above
```

### Redirect URL Configuration

```ts
// For development (Expo Go / dev client)
const redirectTo = makeRedirectUri({
  // Defaults to: expo://localhost:8081
  scheme: "elite",
  path: "google-auth",  // optional: elite://google-auth
});
```

## Supabase Configuration

### Required Settings

1. **Authentication → Providers → Google**:
   - Enable Google provider
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

2. **Google Cloud Console Setup**:
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://miguagxwnorpktlgizyv.supabase.co/auth/v1/callback`
   - For development, also add:
     - `https://miguagxwnorpktlgizyv.supabase.co/auth/v1/authorize`

3. **Authentication → Settings → Redirect URLs**:
   - Add: `elite://`
   - Add: `elite://google-auth` (if using path-based redirects)

### Google Cloud Console Steps

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or select existing)
3. Enable "Google+ API" and "People API"
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Application type: **Web application**
6. Authorized redirect URIs: `https://miguagxwnorpktlgizyv.supabase.co/auth/v1/callback`
7. Copy Client ID and Client Secret to Supabase dashboard

## State Management

### Zustand Auth Store

OAuth login updates the same auth state as email/password login:

```ts
// After successful OAuth:
authStore.setUser(session.user);
authStore.setSession(session);
authStore.setInitialized(true);
```

### User Metadata from Google

After Google OAuth, `user.user_metadata` contains:

```json
{
  "avatar_url": "https://lh3.googleusercontent.com/...",
  "email": "user@gmail.com",
  "email_verified": true,
  "full_name": "John Doe",
  "iss": "https://accounts.google.com",
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/...",
  "provider_id": "1234567890"
}
```

### Local Component State

```ts
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

## Validation Requirements

### OAuth Response Validation

- Verify `access_token` and `refresh_token` exist in redirect URL
- Verify tokens are valid Supabase JWTs
- Handle cases where tokens are missing or malformed

### Account Linking

If a user signs up with email and later tries Google OAuth with the same email:

- Supabase automatically links the accounts
- The user's `app_metadata.providers` will include both `email` and `google`
- User metadata from Google may override existing metadata

## Error Handling

### Error Mapping

| Scenario | User Message |
|----------|-------------|
| User cancels OAuth | "Sign in was cancelled" (or silently ignore) |
| Network error | "Network error. Please check your connection" |
| Invalid tokens | "Authentication failed. Please try again" |
| Supabase error | Map to friendly message based on error code |
| In-app browser fails | Fall back to system browser |

### Error Handling Code

```ts
try {
  const res = await WebBrowser.openAuthSessionAsync(oauthUrl, redirectTo);

  if (res.type === "cancel") {
    // User cancelled — do nothing or show subtle message
    return;
  }

  if (res.type === "error") {
    setError("Authentication failed. Please try again.");
    return;
  }

  if (res.type === "success") {
    await createSessionFromUrl(res.url);
  }
} catch (err) {
  setError("Something went wrong. Please try again.");
}
```

## Edge Cases

1. **User cancels OAuth in browser** → Return to app silently, no error shown
2. **User completes OAuth but network fails** → Show retry option
3. **User has existing email account** → Supabase links accounts automatically
4. **User's Google session expires** → In-app browser shows Google login page
5. **Deep link doesn't fire** → Fall back to polling session status
6. **User opens app from notification during OAuth** → OAuth session may be lost; show error
7. **Multiple Google accounts** → User selects in Google's account picker
8. **App killed during OAuth** → Deep link still opens app and creates session
9. **In-app browser not available** → Use `Linking.openURL()` as fallback
10. **Token refresh fails** → User must re-authenticate

## Testing Checklist

- [ ] Google button is visible and styled correctly
- [ ] Tapping button opens in-app browser
- [ ] Google login page loads in browser
- [ ] User can sign in with Google account
- [ ] Browser closes after successful sign-in
- [ ] Session is created from OAuth tokens
- [ ] User is redirected to home after OAuth
- [ ] User metadata (name, avatar) is stored
- [ ] Cancel button returns to app gracefully
- [ ] Network error shows retry option
- [ ] Session persists after app restart
- [ ] Works with existing email account (linking)
- [ ] Works on iOS and Android
- [ ] Works when app is killed and opened from OAuth redirect

## Definition of Done (DoD)

- [ ] Google OAuth flow works end-to-end
- [ ] `supabase.auth.signInWithOAuth({ provider: 'google' })` is called
- [ ] In-app browser opens for Google sign-in
- [ ] Deep link handler extracts tokens from redirect
- [ ] Session is created from OAuth tokens
- [ ] User metadata is stored in Zustand store
- [ ] Error handling covers cancel, network, and auth failures
- [ ] Session persists across app restarts
- [ ] No TypeScript errors
- [ ] Works on iOS and Android
- [ ] Supabase Google provider is configured

## Dependencies

- **Required packages**: `expo-auth-session`, `expo-web-browser`, `expo-linking` (need installation)
- **Blocks**: None
- **Depends on**: Phase 3 (Login — for session management infrastructure)

### Package Installation

```bash
npx expo install expo-auth-session expo-web-browser expo-linking
```

### Expo Configuration

No changes needed to `app.json` — the `scheme: "elite"` is already configured.

However, for Google OAuth in development, you may need to add to `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-auth-session",
        {
          "scheme": "elite"
        }
      ]
    ]
  }
}
```
