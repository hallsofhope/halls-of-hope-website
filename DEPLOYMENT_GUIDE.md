# 🏠 Halls of Hope Website - Deployment Guide

## What's Inside This Folder

```
📁 halls-of-hope-cms/
│
├── 📁 admin/              ← Admin Dashboard (you'll access this at /admin)
│   ├── index.html         ← Admin login page
│   └── config.yml         ← Defines what you can edit
│
├── 📁 data/               ← Your Content (editable via admin)
│   ├── 📁 videos/         ← Video entries
│   ├── 📁 products/       ← Shop products
│   └── 📁 settings/       ← Site settings (social links, etc.)
│
├── 📁 images/             ← Images
│   └── logo.png           ← Your logo
│
├── index.html             ← Homepage
├── watch.html             ← Videos page
├── shop.html              ← Shop page
├── about.html             ← About page
├── contact.html           ← Contact page
└── netlify.toml           ← Netlify settings
```

---

# 🚀 STEP-BY-STEP DEPLOYMENT GUIDE

Follow these steps EXACTLY. Screenshots would be at each step in a video tutorial.

---

## STEP 2: Create a GitHub Account

**Time: 5 minutes**

1. Open your browser and go to: **https://github.com**

2. Click the **"Sign up"** button (top right)

3. Enter:
   - Your email address
   - Create a password
   - Choose a username (e.g., `hallsofhope` or your name)

4. Complete the puzzle verification

5. Check your email and enter the verification code

6. When asked about preferences, you can skip or select "Just me" and "Skip personalization"

✅ **Done! You now have a GitHub account.**

---

## STEP 3: Create a New Repository on GitHub

**Time: 3 minutes**

1. While logged into GitHub, click the **"+"** icon in the top-right corner

2. Select **"New repository"**

3. Fill in:
   - **Repository name:** `halls-of-hope-website`
   - **Description:** `My storytelling website` (optional)
   - **Public** (keep this selected)
   - ❌ Do NOT check "Add a README file"

4. Click **"Create repository"**

5. You'll see a page with instructions - **leave this page open!**

✅ **Done! Your repository is created.**

---

## STEP 4: Upload Your Website Files to GitHub

**Time: 5 minutes**

**Option A: Easy Way (Drag and Drop)**

1. On the repository page, you should see a link that says **"uploading an existing file"** - click it

2. Open the folder where you extracted this website

3. Select ALL files and folders inside (Ctrl+A or Cmd+A), then drag them into the GitHub upload area

4. Wait for all files to upload (you'll see them listed)

5. Scroll down and click **"Commit changes"** (green button)

6. Wait for the upload to complete

✅ **Done! Your files are now on GitHub.**

---

## STEP 5: Create a Netlify Account

**Time: 3 minutes**

1. Open a new tab and go to: **https://www.netlify.com**

2. Click **"Sign up"** (top right)

3. Click **"Sign up with GitHub"** (this is the easiest way!)

4. If asked, click **"Authorize Netlify"** to connect your GitHub account

5. Complete any additional verification if asked

✅ **Done! Your Netlify account is connected to GitHub.**

---

## STEP 6: Deploy Your Website on Netlify

**Time: 5 minutes**

1. In Netlify, you should see your dashboard. Click **"Add new site"**

2. Select **"Import an existing project"**

3. Click **"Deploy with GitHub"**

4. If asked to authorize, click **"Authorize Netlify"**

5. You'll see a list of your repositories. Click on **"halls-of-hope-website"**

6. On the next screen, leave all settings as default:
   - Branch: `main`
   - Build command: (leave empty)
   - Publish directory: (leave empty)

7. Click **"Deploy site"**

8. Wait 1-2 minutes. You'll see "Site is live" with a URL like:
   `https://random-name-12345.netlify.app`

9. Click that URL to see your live website! 🎉

✅ **Your website is now LIVE on the internet!**

---

## STEP 7: Enable Netlify Identity (Admin Login)

**Time: 3 minutes**

This step lets you log into your admin dashboard.

1. In Netlify, go to your site's dashboard

2. Click **"Site configuration"** in the left sidebar

3. Scroll down and click **"Identity"**

4. Click **"Enable Identity"** (green button)

5. Under **"Registration preferences"**, select **"Invite only"**
   - This means only people you invite can access admin

6. Click **"Save"**

✅ **Identity is enabled!**

---

## STEP 8: Enable Git Gateway

**Time: 2 minutes**

This lets the admin panel save changes to your website.

1. Still on the Identity page, scroll down to **"Services"**

2. Find **"Git Gateway"** and click **"Enable Git Gateway"**

3. Click **"Save"** if prompted

✅ **Git Gateway is enabled!**

---

## STEP 9: Invite Yourself as Admin

**Time: 2 minutes**

1. Still on the Identity page, click **"Invite users"** button

2. Enter YOUR email address

3. Click **"Send"**

4. Check your email inbox (and spam folder)

5. You'll receive an email from Netlify - click the link inside

6. Create a password for your admin account

✅ **You're now an admin!**

---

## STEP 10: Test Your Admin Dashboard! 🎉

**Time: 1 minute**

1. Go to your website URL and add `/admin` at the end:
   `https://your-site-name.netlify.app/admin`

2. Click **"Login with Netlify Identity"**

3. Enter your email and password

4. You're in! You should see:
   - 📺 Videos
   - 🛒 Products
   - ⚙️ Site Settings

✅ **Your admin dashboard is working!**

---

## STEP 11: Connect Your Domain (hallsofhope.com)

**Time: 10-30 minutes (DNS can take time)**

1. In Netlify, go to **"Domain management"** (left sidebar)

2. Click **"Add a domain"**

3. Type: `hallsofhope.com` and click **"Verify"**

4. Click **"Add domain"**

5. Netlify will show you DNS settings you need to add

### At Your Domain Registrar (where you bought the domain):

6. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)

7. Find **DNS Settings** or **DNS Management**

8. Add these records:

   **Record 1:**
   - Type: `A`
   - Name/Host: `@` (or leave blank)
   - Value: `75.2.60.5`

   **Record 2:**
   - Type: `CNAME`
   - Name/Host: `www`
   - Value: `your-site-name.netlify.app` (your Netlify URL)

9. Save the DNS changes

10. Wait 10-30 minutes (sometimes up to 24 hours) for DNS to update

11. Go back to Netlify and click **"Verify DNS configuration"**

12. Once verified, click **"Provision certificate"** for HTTPS

✅ **Your domain is connected! Visit https://hallsofhope.com**

---

# 📺 HOW TO USE YOUR ADMIN DASHBOARD

## Adding a New Video

1. Go to `hallsofhope.com/admin`
2. Log in
3. Click **"📺 Videos"** in the sidebar
4. Click **"New Video"**
5. Fill in:
   - Video Title
   - YouTube URL
   - Upload a thumbnail OR paste a thumbnail URL
   - Select a category
   - Add a description
   - Enter the duration
   - Turn ON "Show on Homepage?" if you want it featured
6. Click **"Publish"** (top right)
7. Wait 1-2 minutes for the site to update

## Editing Site Settings

1. Go to admin
2. Click **"⚙️ Site Settings"**
3. Click what you want to edit:
   - **General Settings** - Site title, tagline, hero text
   - **Social Media Links** - YouTube, Instagram, etc.
   - **Contact Information** - Email addresses
   - **Homepage Statistics** - The numbers shown on homepage
4. Make changes
5. Click **"Publish"**

## Adding a New Product

1. Go to admin
2. Click **"🛒 Products"**
3. Click **"New Product"**
4. Fill in all the fields
5. Add features (click "Add feature" for each bullet point)
6. Click **"Publish"**

---

# ❓ TROUBLESHOOTING

### "Admin page is blank"
- Make sure Identity is enabled (Step 7)
- Make sure Git Gateway is enabled (Step 8)
- Clear your browser cache (Ctrl+Shift+Delete)
- Try a different browser

### "Can't log in to admin"
- Check if you clicked the invitation email link
- Try "Forgot password" on the login screen
- Make sure you're using the right email

### "Changes don't appear on site"
- Wait 1-2 minutes - changes take time to deploy
- Check Netlify dashboard for deployment status
- Hard refresh the page (Ctrl+Shift+R)

### "Domain not working"
- DNS changes can take up to 48 hours
- Double-check your DNS records match exactly
- Use https://dnschecker.org to check DNS propagation

### "Getting 404 error on /admin"
- Make sure the `admin` folder was uploaded to GitHub
- Check if files are in the root of the repository, not in a subfolder

---

# 🎉 CONGRATULATIONS!

Once complete, you have:

✅ A live website at **hallsofhope.com**
✅ An admin dashboard at **hallsofhope.com/admin**
✅ Ability to add/edit/delete videos without coding
✅ Ability to manage products
✅ Ability to update social links and settings
✅ Secure login (only you can access admin)
✅ Automatic HTTPS (secure connection)
✅ Free hosting forever!

---

# 📞 NEED HELP?

If you get stuck at any step, come back to Claude and tell me:
1. Which step number you're on
2. What you see on your screen
3. Any error messages

I'll help you through it!

---

*Halls of Hope - "Where the overlooked become unforgettable"*
