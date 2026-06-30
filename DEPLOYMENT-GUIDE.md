# Deployment & SEO Setup Guide 🚀

## Quick Deployment Checklist

### Pre-Deployment
- [x] ✅ Build successful (`npm run build`)
- [x] ✅ All SEO optimizations implemented
- [x] ✅ Sitemap created
- [x] ✅ Robots.txt configured
- [ ] HTTPS certificate installed
- [ ] Domain configured (carolinaavila.com.mx)

### Deploy to Vercel (Recommended)

#### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

#### Option 3: Git Integration
```bash
# Push to GitHub/GitLab
git add .
git commit -m "SEO optimizations complete"
git push origin main

# Vercel will auto-deploy from Git
```

---

## Post-Deployment SEO Setup

### 1. Google Search Console (Day 1) ⚡

#### Add Your Property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://carolinaavila.com.mx`
4. Verify ownership via:
   - HTML file upload, OR
   - HTML tag, OR
   - Domain DNS record (recommended)

#### Submit Sitemap
```
1. In Search Console, go to "Sitemaps"
2. Enter: https://carolinaavila.com.mx/sitemap.xml
3. Click "Submit"
```

#### Request Indexing
```
1. Go to "URL Inspection"
2. Enter your homepage URL
3. Click "Request Indexing"
4. Repeat for important pages (Quiz, top blog posts)
```

---

### 2. Bing Webmaster Tools (Day 1) ⚡

#### Add Your Site
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Click "Add a Site"
3. Enter: `https://carolinaavila.com.mx`
4. Verify ownership

#### Import from Google
```
Option: Import site from Google Search Console
This copies your sitemap and settings automatically
```

#### Submit Sitemap
```
1. Go to "Sitemaps"
2. Enter: https://carolinaavila.com.mx/sitemap.xml
3. Click "Submit"
```

---

### 3. Google Analytics 4 (Day 1-2) 📊

#### Create GA4 Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Admin" → "Create Property"
3. Property name: "Carolina Avila - Psicóloga"
4. Time zone: America/Mexico_City
5. Currency: MXN (Mexican Peso)

#### Add Data Stream
```
1. Click "Data Streams" → "Add Stream" → "Web"
2. Website URL: https://carolinaavila.com.mx
3. Stream name: "Main Website"
4. Copy your Measurement ID (G-XXXXXXXXXX)
```

#### Install GA4 in Your Site
Add to `src/main.jsx` or use Google Tag Manager (recommended):

```javascript
// Option 1: Direct Installation (not recommended - use GTM instead)
// Add to index.html <head>:
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

### 4. Google Tag Manager (Day 1-2) 🏷️

#### Create GTM Container
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Create Account → Container
3. Container name: "Carolina Avila Website"
4. Target platform: Web

#### Install GTM
Add to `index.html`:

```html
<!-- In <head> after <title> -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- In <body> immediately after opening tag -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

#### Add GA4 via GTM
```
1. In GTM, click "Tags" → "New"
2. Tag Configuration → Google Analytics: GA4 Configuration
3. Measurement ID: G-XXXXXXXXXX
4. Triggering: All Pages
5. Save and publish
```

---

### 5. Google Business Profile (Day 2-3) 📍

#### Create/Claim Business Profile
1. Go to [business.google.com](https://business.google.com)
2. Search for your business or click "Add your business"
3. Business name: "Psicóloga Carolina Avila"
4. Category: Psychologist
5. Add location: Entre Ríos 3113, Guadalajara, Jalisco 44630
6. Add phone: +52 33 2289 2040
7. Add website: https://carolinaavila.com.mx

#### Complete Your Profile
- [ ] Upload photos (office, exterior, logo)
- [ ] Add business hours
- [ ] Add services
- [ ] Write business description
- [ ] Request reviews from patients (with consent)

#### Verify Your Business
```
Google will send a postcard to your address with a verification code
Or verify via phone/email if available
```

---

### 6. Set Up Conversion Tracking

#### Important Conversions to Track
1. **Contact Form Submissions**
   - GTM Event: `contact_form_submit`
   
2. **Quiz Completions**
   - GTM Event: `quiz_complete`
   
3. **Phone Clicks**
   - GTM Event: `phone_click`
   
4. **Email Clicks**
   - GTM Event: `email_click`
   
5. **WhatsApp Clicks**
   - GTM Event: `whatsapp_click`
   
6. **Calendar Clicks**
   - GTM Event: `calendar_click`

#### Implement in Code
Add event tracking to buttons/forms:

```javascript
// Example for contact form
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Send to GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'contact_form_submit',
    'form_name': 'contact_form'
  });
  
  // Your form logic...
};
```

---

## Week 1 Tasks

### Day 1 ⚡
- [x] Deploy to production
- [ ] Verify HTTPS working
- [ ] Test all pages load correctly
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request indexing for homepage

### Day 2-3
- [ ] Set up Google Analytics 4
- [ ] Set up Google Tag Manager
- [ ] Install GTM on site
- [ ] Test analytics tracking
- [ ] Create Google Business Profile
- [ ] Upload business photos

### Day 4-5
- [ ] Test all structured data with Rich Results Test
- [ ] Run Lighthouse audit
- [ ] Run PageSpeed Insights
- [ ] Test mobile-friendliness
- [ ] Check all internal links
- [ ] Test contact forms

### Day 6-7
- [ ] Write first blog post
- [ ] Share on social media
- [ ] Engage with followers
- [ ] Monitor Search Console for first impressions

---

## Monitoring & Maintenance

### Daily (First Week)
- Check Search Console for crawl errors
- Monitor Analytics for traffic
- Test site speed
- Check uptime

### Weekly (First Month)
- Review Search Console performance report
- Check Analytics for traffic patterns
- Monitor keyword rankings
- Post on social media (3x per week)
- Respond to any reviews

### Monthly
- Comprehensive SEO audit
- Update blog (2-4 new posts)
- Review and optimize meta descriptions
- Check backlinks
- Update sitemap if needed
- Review conversion rates

---

## Testing Your SEO

### Required Tests

#### 1. Rich Results Test
```
URL: https://search.google.com/test/rich-results
Test: https://carolinaavila.com.mx/

Expected Results:
✅ Psychologist schema valid
✅ LocalBusiness schema valid
✅ WebSite schema valid
✅ No errors or warnings
```

#### 2. Mobile-Friendly Test
```
URL: https://search.google.com/test/mobile-friendly
Test: https://carolinaavila.com.mx/

Expected Results:
✅ Page is mobile-friendly
✅ Text is readable
✅ Content fits screen
✅ Links are tap-friendly
```

#### 3. PageSpeed Insights
```
URL: https://pagespeed.web.dev/
Test: https://carolinaavila.com.mx/

Target Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
```

#### 4. Lighthouse Audit
```
In Chrome DevTools:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select all categories
4. Click "Generate report"

Target Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
```

---

## Common Issues & Solutions

### Issue: Sitemap Not Indexed
**Solution:**
1. Verify sitemap.xml is accessible
2. Check for XML syntax errors
3. Re-submit in Search Console
4. Wait 24-48 hours

### Issue: Structured Data Errors
**Solution:**
1. Test with Rich Results Test
2. Fix any reported errors
3. Validate JSON-LD syntax
4. Re-deploy and re-test

### Issue: Low Page Speed Score
**Solution:**
1. Optimize images further (compress, lazy load)
2. Enable Vercel's image optimization
3. Check for render-blocking resources
4. Enable HTTP/2 and compression

### Issue: Not Ranking in Local Pack
**Solution:**
1. Verify Google Business Profile
2. Get more reviews
3. Add more location-specific content
4. Build local citations
5. Ensure NAP consistency (Name, Address, Phone)

---

## SEO Performance Goals

### Month 1
- [x] Site indexed by Google
- [x] Sitemap submitted
- [ ] 100+ impressions in search
- [ ] 5+ clicks from organic search
- [ ] Google Business Profile live
- [ ] 4 blog posts published

### Month 2
- [ ] 500+ impressions
- [ ] 25+ clicks
- [ ] 3+ keywords in top 30
- [ ] 2+ patient reviews
- [ ] 8 total blog posts
- [ ] 5+ backlinks

### Month 3
- [ ] 1,500+ impressions
- [ ] 100+ clicks
- [ ] 5+ keywords in top 20
- [ ] 1+ keyword in top 10
- [ ] 5+ patient reviews
- [ ] 12 total blog posts
- [ ] 10+ backlinks
- [ ] Featured in local pack

### Month 6
- [ ] 5,000+ impressions
- [ ] 500+ clicks
- [ ] 10+ keywords in top 10
- [ ] "psicóloga guadalajara" in top 5
- [ ] 15+ patient reviews
- [ ] 24+ blog posts
- [ ] 25+ backlinks
- [ ] 5+ consultation bookings per month from organic

---

## Analytics Setup Checklist

### Google Analytics 4 Configuration
- [ ] Property created
- [ ] Data stream added
- [ ] GTM configured
- [ ] Events tracking set up:
  - [ ] page_view (automatic)
  - [ ] contact_form_submit
  - [ ] quiz_complete
  - [ ] phone_click
  - [ ] email_click
  - [ ] whatsapp_click
  - [ ] calendar_click
- [ ] Goals/Conversions defined
- [ ] Audience segments created
- [ ] Custom reports set up

### Google Tag Manager Configuration
- [ ] Container created
- [ ] GA4 tag configured
- [ ] All event triggers set up
- [ ] Testing completed
- [ ] Container published

---

## Quick Reference

### Important URLs
```
Website: https://carolinaavila.com.mx/
Sitemap: https://carolinaavila.com.mx/sitemap.xml
Robots: https://carolinaavila.com.mx/robots.txt

Google Search Console: https://search.google.com/search-console
Bing Webmaster: https://www.bing.com/webmasters
Google Analytics: https://analytics.google.com
Google Tag Manager: https://tagmanager.google.com
Google Business: https://business.google.com

Rich Results Test: https://search.google.com/test/rich-results
PageSpeed Insights: https://pagespeed.web.dev/
Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
```

### Contact Information
```
Business: Psicóloga Carolina Avila
Address: Entre Ríos 3113, 44630 Guadalajara, Jalisco
Phone: +52 33 2289 2040
Email: contacto@carolinaavila.com
Hours: Mon-Fri, 9:00 AM - 8:00 PM
```

### Target Keywords (Priority)
```
1. psicóloga guadalajara
2. terapia psicológica guadalajara
3. psicóloga clínica guadalajara
4. terapia online mexico
5. carolina avila psicóloga
```

---

## Support & Questions

For technical support or questions:
- Review [SEO-GUIDE.md](./SEO-GUIDE.md)
- Check [.seo-checklist.md](./.seo-checklist.md)
- Read [OPTIMIZATION-SUMMARY.md](./OPTIMIZATION-SUMMARY.md)

---

**Deployment Guide Version**: 1.0  
**Last Updated**: June 30, 2026  
**Status**: ✅ Ready for Deployment

Good luck with the launch! 🎉
