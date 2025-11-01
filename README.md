# GSAP Portfolio - Premium Motion Website

A dark, premium, motion-driven portfolio site inspired by GSAP.com, featuring immersive scroll-triggered animations, parallax depth effects, text reveals, and morphing elements.

## ✨ Features

- **Hero Section**: Split-text letter-by-letter reveal animation using GSAP SplitType
- **Scroll-Triggered Animations**: Smooth section reveals with ScrollTrigger
- **Custom Glowing Cursor**: Animated cursor with motion easing principles
- **Skills Grid**: Staggered animations with hover effects
- **Projects Section**: Cards with morphing SVG connectors
- **Contact Form**: EmailJS integration with animated toast notifications
- **60fps Performance**: GPU-accelerated animations
- **Fully Responsive**: Works beautifully on mobile, tablet, and desktop

## 🎨 Color Palette

- Background: `#0c0c0e`
- Card: `#44444E`
- Accent: `#715A5A`
- Text: `#D3DAD9`

## 🚀 Tech Stack

- **React** - UI library
- **Tailwind CSS** - Styling
- **GSAP** - Animation library with ScrollTrigger
- **SplitType** - Text splitting for animations
- **EmailJS** - Contact form submissions
- **Radix UI** - Toast notifications
- **Vite** - Build tool

## 📦 Installation

```bash
npm install
```

## 🛠️ Configuration

To enable the contact form with EmailJS:

1. Copy `.env.example` to `.env`
2. Sign up at [EmailJS](https://www.emailjs.com/)
3. Add your service ID, template ID, and public key to `.env`

The form will work without EmailJS configuration, showing a demo success message.

## 🏃 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📱 Responsive Design

The site is fully responsive with breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## ⚡ Performance

- All animations run at 60fps using GPU acceleration
- Optimized scroll animations with GSAP ScrollTrigger
- Lazy loading and efficient rendering
- No heavy dependencies beyond GSAP and essential UI libraries

## 🎭 Animation Details

### Hero Animations
- Split-text character-by-character reveal
- Staggered fade-in-up for subtitle and CTA
- Rotating and breathing SVG accent element

### Scroll Animations
- Section fade-up reveals triggered at 80% viewport
- Staggered child animations for cards and icons
- Morphing SVG paths with smooth transitions

### Interaction
- Hover scale and rotate effects with back.out easing
- Custom cursor with motion easing
- Smooth color transitions

## 📄 License

MIT License - feel free to use this project for your own portfolio.
