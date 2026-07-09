# GitHub Pages Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Using GitHub Web Interface

1. **Create a new repository**
   - Go to [github.com](https://github.com)
   - Click "New" or "+"
   - Name your repository (e.g., `react-adventure-storybook`)
   - Make it public
   - Click "Create repository"

2. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop all your project files
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch
   - Click Save

4. **Access your site**
   - Your site will be at: `https://yourusername.github.io/react-adventure-storybook/`

### Option 2: Using Git Command Line

```bash
# Navigate to your project folder
cd "D:\Story book"

# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: React Adventure Storybook"

# Add remote repository
git remote add origin https://github.com/yourusername/react-adventure-storybook.git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in Settings > Pages.

## Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All sound files are in `assets/sounds/` folder
- [ ] Character GLB files are in `assets/` folder
- [ ] All CSS and JS files are properly linked
- [ ] Test locally by opening `index.html` in a browser
- [ ] Remove any console errors

## Post-Deployment

After deploying:

1. Wait 2-3 minutes for GitHub to build your site
2. Visit your site URL
3. Test all interactive features
4. Check responsive design on different devices

## Troubleshooting

### Site not loading?
- Check if GitHub Pages is enabled in Settings > Pages
- Make sure your repository is public
- Wait a few minutes and refresh

### Missing assets?
- Verify all files are uploaded
- Check file paths in HTML/CSS/JS files
- Ensure file names are case-sensitive

### Sound not working?
- Modern browsers require user interaction before playing audio
- Click anywhere on the page first
- Check browser console for errors

## Custom Domain (Optional)

To use a custom domain:

1. Buy a domain from a registrar
2. In your repository, create a file named `CNAME`
3. Add your domain name to the file
4. In Settings > Pages, add your domain
5. Update DNS settings at your registrar

## Performance Tips

1. **Compress images**: Use tools like TinyPNG
2. **Minify CSS/JS**: Use online minifiers
3. **Optimize GLB files**: Use gltf-pipeline
4. **Enable compression**: GitHub Pages does this automatically

## Support

If you need help:
- Check GitHub Pages documentation
- Search for error messages online
- Ask in GitHub Discussions