# Dark Premium Portfolio with GSAP

A dark, premium, motion-driven portfolio website inspired by GSAP.com with immersive, fluid animations featuring scroll-triggered sequences, parallax depth, text reveals, and morphing elements.

## Features

- **Hero Section** with SplitText letter-by-letter reveal and morphing SVG accent
- **About Section** with scroll-triggered fade/rotate-in and breathing/morphing SVG background
- **Skills Section** with animated grid of 12 technology icons and staggered hover effects
- **Projects Section** with scroll-triggered card reveals and morphing SVG path connectors
- **Contact Section** with EmailJS integration and GSAP stagger animations
- **Custom Glowing Cursor** with eased motion tracking
- **No Navbar** - Clean, distraction-free design
- **Dark Color Palette**: #0c0c0e, #44444E, #715A5A, #D3DAD9

## Tech Stack

- **React** with Vite
- **TypeScript**
- **Tailwind CSS** for styling
- **ShadCN UI** components
- **GSAP** with premium plugins:
  - ScrollTrigger
  - SplitText
  - MorphSVG
  - DrawSVG
- **EmailJS** for contact form

## Prerequisites

- Node.js 18+ and npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Configure EmailJS (Optional):
Create a `.env` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

To set up EmailJS:
- Sign up at [EmailJS.com](https://www.emailjs.com/)
- Create an email service
- Create an email template
- Copy your Service ID, Template ID, and Public Key to the `.env` file

## Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # ShadCN UI components
│   └── CustomCursor.tsx # Custom cursor component
├── sections/
│   ├── Hero.tsx         # Hero section with SplitText
│   ├── About.tsx        # About section
│   ├── Skills.tsx       # Skills grid
│   ├── Projects.tsx     # Projects showcase
│   └── Contact.tsx      # Contact form
├── lib/
│   ├── gsap.ts          # GSAP configuration
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
└── index.css            # Global styles
```

## Animation System

### Hero Load Animations
- Split-text staggered reveal using GSAP SplitText
- Fade + translateY entrance for subtitle and CTAs
- Scale-in accent elements with back.out easing
- Morphing SVG background shapes
- Timeline sequencing for cinematic arrival

### Scroll-Triggered Animations
- Section fade-up/slide-in reveals via ScrollTrigger (start: "top 80%")
- Staggered child animations for skill icons and project cards
- Mask/clip-path reveals for images
- Opacity wipe transitions between sections

### Hover & Interaction Effects
- Hover scale + rotate with easing
- Smooth color transitions using GSAP tweens
- Custom glowing cursor with motion easing

### Global Motion System
- 60fps GPU-accelerated transitions
- Reusable GSAP timelines per component
- Custom easings (power4.out, expo.inOut, back.out(1.7))
- Scroll depth effects via transforms

## Technologies Used

### Skills Showcased
- ☕ Java
- 🍃 Spring
- 🐘 PostgreSQL
- 🐬 MySQL
- ⚡ JavaScript
- 📄 HTML5
- 🎨 CSS3
- ⚛️ React
- 🐍 Python
- 💻 Bash
- 📦 Git
- 📮 Postman

## Design Principles

- **Elegant & Calm**: Dark premium aesthetic inspired by GSAP.com
- **Motion with Purpose**: Every animation follows physical motion principles
- **Cinematic Rhythm**: Soft acceleration and gentle ease-outs
- **Accessible**: Respects prefers-reduced-motion
- **Responsive**: Works on all screen sizes
- **Performance**: Optimized for 60fps

## Browser Support

Modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## Credits

Inspired by the incredible animation work at [GSAP.com](https://gsap.com)
