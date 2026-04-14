# eBay Template Designer - Login Credentials

## Demo Accounts

The database is pre-seeded with two demo user accounts for testing and development.

### Demo Account 1
- **Email**: `demo1@example.com`
- **Password**: `Password123!`
- **Name**: Demo Seller One
- **Pre-loaded Templates**: 
  - Sneaker Premium Custom
  - Trading Cards Collector
  - General Purpose Template

### Demo Account 2
- **Email**: `demo2@example.com`
- **Password**: `Password123!`
- **Name**: Demo Seller Two
- **Pre-loaded Templates**:
  - Electronics Warranty Focus
  - Premium Product Showcase
  - Bulk Generator Example

---

## How to Login

1. **Open the Application**
   - Navigate to `http://localhost:5173`

2. **Go to Login Page**
   - Click "Sign In" or navigate to `/login`

3. **Enter Credentials**
   - Email: `demo1@example.com` (or `demo2@example.com`)
   - Password: `Password123!`

4. **Click "Sign In"**
   - You'll be redirected to the dashboard

---

## What You Can Do

### Template Builder
- Create and edit templates
- Add up to 10 different block types
- Apply advanced styling (18 properties)
- Define custom variables
- Preview in real-time

### My Templates
- View all your created templates
- Edit existing templates
- Duplicate templates
- Delete templates
- Export templates as HTML

### Bulk Generator
- Upload CSV files
- Map columns to template variables
- Generate multiple eBay listings
- Download all listings at once

### Settings
- Update profile information
- Customize branding (logo, colors)
- Manage preferences
- View account information

---

## Features Available

### ✅ New Features (Just Added)
- **5 New Block Types**:
  - ⭐ Rating Block
  - 👥 Social Proof Block
  - 💬 Testimonial Block
  - 🔔 Call-to-Action Block
  - ━ Divider Block

- **10 Advanced Styling Properties**:
  - Font weight, line height, text alignment
  - Box shadows, opacity, transforms, transitions

- **Custom Variables**:
  - Define unlimited custom variables
  - Support for multiple data types

- **Layout Configuration**:
  - Control responsive design
  - Set column layouts
  - Configure spacing

---

## Troubleshooting

### "Invalid credentials" Error
- **Issue**: Login failed with incorrect credentials
- **Solution**: Check that you're using the exact email and password from above
- **Note**: Passwords are case-sensitive

### "Network Error"
- **Issue**: Can't connect to the server
- **Solution**: Ensure the backend server is running (`npm run dev` from root directory)

### "Page Not Found" After Login
- **Issue**: Redirected to 404 after successful login
- **Solution**: This is normal on first load. The app redirects to `/` (dashboard)

### Can't See Templates
- **Issue**: No templates appear in "My Templates"
- **Solution**: Templates are tied to the email you're logged in with. Make sure you're using the correct demo account

---

## Resetting Demo Data

To reset the database with fresh demo data:

```bash
cd server
npm run seed:dummy
```

This will:
- Clear all existing data
- Recreate the 2 demo users
- Recreate all sample templates
- Reset the database to initial state

---

## Creating Your Own Account

To create a new account:

1. Go to `/signup`
2. Fill in:
   - Full name
   - Email address
   - Password
3. Click "Create Account"
4. You'll be logged in automatically

---

## API Authentication

For API requests, include the JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:5001/api/templates
```

### Getting a Token

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo1@example.com","password":"Password123!"}'
```

Response includes `token` field with JWT.

---

## Password Requirements

- **Minimum length**: 8 characters (enforced on signup)
- **Recommended**: Mix of uppercase, lowercase, numbers, and special characters
- **Demo password**: `Password123!` (meets all requirements)

---

## Account Security

- Passwords are hashed with bcrypt (salted)
- Tokens expire after 7 days
- Tokens are stored in browser localStorage
- HTTPS recommended for production

---

## Session Management

### Auto-refresh
- Sessions are automatically checked on app load
- Invalid/expired tokens are cleared

### Manual Logout
- Click "Logout" in settings
- Clears token from localStorage
- Redirects to login page

### Token Expiry
- Default expiry: 7 days
- Expired tokens require re-login
- Token refresh endpoint available

---

## Production Considerations

⚠️ **Important**: These demo credentials should NOT be used in production.

For production:
1. Remove demo users from seeding script
2. Implement proper user management system
3. Use strong, unique passwords
4. Enable HTTPS for all authentication
5. Implement rate limiting on login endpoint
6. Add email verification for signup
7. Implement password reset flow

---

## Support

If you encounter login issues:

1. Check browser console for errors (F12)
2. Verify backend server is running
3. Check network tab in DevTools
4. Ensure correct email/password format
5. Try clearing browser cache
6. Reseed database if needed

---

**Last Updated**: April 15, 2026  
**Version**: 1.0
