# RecruiterAI Landing Page

A premium, conversion-focused landing page for an AI recruiting platform built with Next.js 14, featuring a stunning scrollytelling hero animation.

## 🚀 Features

- **Scrollytelling Hero**: Canvas-based scroll animation with dynamic frame sequence rendering
- **7 Complete Sections**:
  - 🎬 Scrollytelling Hero with text overlays
  - 🔄 Workflow Diagrams (3 automated hiring flows)
  - 📊 Impact Metrics (animated counters)
  - 🌐 Logo Slider (infinite auto-scroll)
  - 💬 Testimonials
  - ❓ FAQ Accordion
  - 🎯 Final CTA

- **Premium Design**:
  - Dark SaaS aesthetic
  - Glassmorphism effects
  - Smooth Framer Motion animations
  - Fully responsive (mobile-first)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add your image sequence** (optional):
   - Place numbered PNG/JPG frames in `public/sequence/`
   - See `public/sequence/README.md` for details
   - Component works with fallback gradient if no frames provided

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:
- `accent`: Primary CTA color (default: #3B82F6)
- `background`: Dark background (default: #0a0a0a)

### Content

All section content is in the component files under `/components`:
- `RecruiterScroll.tsx` - Hero text overlays
- `HowItWorks.tsx` - Workflow cards
- `ImpactMetrics.tsx` - Metrics data
- `Testimonials.tsx` - Customer quotes
- `FAQ.tsx` - Questions and answers
- `FinalCTA.tsx` - CTA copy

## 📁 Project Structure

```
aihiring/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles
├── components/
│   ├── RecruiterScroll.tsx   # Scrollytelling hero
│   ├── HowItWorks.tsx        # Workflow section
│   ├── ImpactMetrics.tsx     # Metrics section
│   ├── LogoSlider.tsx        # Platform logos
│   ├── Testimonials.tsx      # Customer testimonials
│   ├── FAQ.tsx               # FAQ accordion
│   └── FinalCTA.tsx          # Final CTA section
├── lib/
│   └── utils.ts         # Utility functions
├── public/
│   └── sequence/        # Image frames for scrollytelling
└── package.json
```

## 🚢 Deployment

Build for production:
```bash
npm run build
npm start
```

Deploy to Vercel (recommended):
```bash
vercel
```

## 📝 License

MIT
