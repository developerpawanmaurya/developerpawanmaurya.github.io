// Each project includes a short `description` (card view) and a full `caseStudy`
// object that's revealed when the user clicks "Read case study".

export const projects = [
  {
    id: 1,
    badge: 'Current role',
    bgClass: 'pv-policy',
    meta: 'Fintech · Insurance · Canada',
    title: 'PolicyAdvisor',
    description:
      "Senior developer on Canada's fully-digital insurance brokerage. Maintain and grow a high-traffic WordPress platform that lets Canadians compare quotes from 30+ insurers across life, health, critical illness, disability and travel — all backed by salaried (non-commissioned) licensed advisors.",
    tech: ['WordPress', 'PHP', 'Custom Plugins', 'AI Integration', 'Lighthouse/SEO', 'GA4'],
    link: 'https://www.policyadvisor.com',
    linkLabel: 'Visit site',
    external: true,
    mock: {
      title: 'Insurance, made simple.',
      kind: 'generic',
      pillClass: 'orange',
      pillText: 'Get a Quote →',
      extra: 'tiles',
    },
    caseStudy: {
      role: 'Senior Web Developer (in-house)',
      timeline: '2022 — Present',
      overview:
        "PolicyAdvisor is a Toronto-based, fully-digital life-insurance brokerage licensed across Ontario, BC, Alberta and Manitoba. The public site is the top of the funnel — it has to educate, build trust, and push the right users into the quote engine without getting in their way.",
      challenge:
        "A high-traffic content + conversion hybrid. Hundreds of insurer comparison pages, provincial landing pages, review content, and a live quote funnel — all needing fast load times, clean schema, airtight analytics, and zero downtime. Legacy parts of the stack were slowing the blog to a crawl and dragging SEO.",
      approach: [
        'Rebuilt the blog and high-value landing templates in custom PHP for a ~30% speed gain and +25 Lighthouse points.',
        'Shipped custom Gutenberg blocks so the content team can assemble comparison pages, FAQs, and CTA modules without touching HTML.',
        'Integrated AI-assisted content modules that surface related products and help users self-qualify before hitting a human advisor.',
        'Tightened GA4 + server-side event tracking, plumbed conversions through to the funnel, and set up uptime + core-web-vitals monitoring.',
      ],
      stack: ['WordPress (multisite)', 'PHP 8', 'Custom Gutenberg blocks', 'MySQL', 'jQuery + vanilla JS', 'GA4', 'GitHub Actions'],
      outcomes: [
        '99.9% uptime across the public site through proactive monitoring and staged releases.',
        '+25 Lighthouse performance points on the blog post-rebuild.',
        'Faster content velocity — editors ship landing pages without eng involvement.',
      ],
    },
  },

  {
    id: 2,
    badge: 'Healthcare',
    bgClass: 'pv-xpert',
    meta: 'Healthcare · Oncology · USA',
    title: 'XpertPatient',
    description:
      "End-to-end front-end build for an award-winning oncology education platform that helps newly-diagnosed cancer patients get 'cancer smart'. Translated dense FDA treatment data into a clear, humane interface including a 'Compare My Treatment Options' tool.",
    tech: ['WordPress', 'Custom Theme', 'UX Engineering', 'Data Integration', 'Accessibility'],
    link: 'https://xpertpatient.com/',
    linkLabel: 'Visit site',
    external: true,
    mock: {
      brand: 'XpertPatient',
      brandColor: '#f97316',
      title: 'CANCER DIAGNOSIS?',
      subtitle: 'Time to get Cancer Smart',
      pillClass: 'blue',
      pillText: 'Get Started Now →',
      kind: 'branded',
    },
    caseStudy: {
      role: 'Front-end / WordPress Developer',
      timeline: '2023',
      overview:
        "XpertPatient gives newly-diagnosed cancer patients unbiased, plain-language information about their diagnosis, FDA-approved treatment options, financial resources and side-effect management — so they can walk into an oncology appointment informed.",
      challenge:
        'Oncology content is emotional, dense and legally sensitive. Copy comes from multiple clinical sources in different shapes. The site had to feel calm and trustworthy, be WCAG-accessible, and handle comparison tables, disease-specific flows and deep sub-navigation without overwhelming a frightened first-time visitor.',
      approach: [
        "Designed a tone-appropriate visual system — generous whitespace, soft accent colors, readable long-form typography.",
        "Built the 'Compare My Treatment Options' flow and FDA treatment browsing experience with clean filtering and responsive tables.",
        'Stitched treatment data from multiple sources into a single content model so editors maintain it in one place.',
        'Accessibility from day one — keyboard navigation, screen-reader labels, color-contrast audits before every release.',
      ],
      stack: ['WordPress', 'ACF Pro', 'Custom theme (PHP + Sass)', 'Vanilla JS', 'REST API', 'Schema.org markup'],
      outcomes: [
        'A patient-facing experience that reviewers and partners consistently call out as clear and non-intimidating.',
        'Partnership-ready platform — adopted by oncology brand partnerships to reach newly-diagnosed patients.',
        'Editors publish new diagnosis and treatment content without developer involvement.',
      ],
    },
  },

  {
    id: 3,
    badge: 'Agency site',
    bgClass: 'pv-memorres',
    meta: 'Agency · Digital Transformation',
    title: 'Memorres Digital',
    description:
      "Custom WordPress theme from scratch for a digital-transformation agency operating across Australia, India, Ireland and Finland. On-brand, fully responsive, performance-optimized — with the whole content model editable by non-developers.",
    tech: ['WordPress', 'Custom Theme', 'ACF', 'SEO', 'CI/CD', 'Git'],
    link: 'https://memorres.com',
    linkLabel: 'Visit site',
    external: true,
    badgeDark: true,
    mock: {
      kind: 'memorres',
    },
    caseStudy: {
      role: 'WordPress Developer',
      timeline: '2022',
      overview:
        "Memorres is a multi-country digital agency offering custom web apps, mobile apps, cloud, UI/UX and e-commerce. Their own site needed to reflect that technical credibility while being easy for internal marketing to update.",
      challenge:
        'The existing site was a stock theme with heavy page builders — slow, inconsistent across industries pages, and painful to update. They needed a bespoke theme that matched an agency-grade brand standard without sacrificing editor ergonomics.',
      approach: [
        'Built a lightweight custom theme from scratch — no page builders — keyed entirely off Advanced Custom Fields and custom block patterns.',
        'Shipped reusable section templates (industries, services, case studies, team) so new pages compose instead of duplicate.',
        'On-page SEO passes: semantic HTML, structured data, internal linking, canonical URLs and sitemap cleanup.',
        'Set up a Git-based deploy flow so staging → production releases are one-click, not drag-and-drop.',
      ],
      stack: ['WordPress', 'ACF Pro', 'Custom theme (PHP + Sass)', 'Gutenberg', 'Git + deployment pipeline'],
      outcomes: [
        'Significantly faster page loads vs. the previous builder-heavy theme.',
        'Marketing ships new case-study and industry pages without engineering.',
        'Consistent on-brand layout across every template type.',
      ],
    },
  },

  {
    id: 4,
    badge: 'Ed-tech / Affiliate',
    bgClass: 'pv-leadsguru',
    meta: 'EdTech · Affiliate · India',
    title: 'LeadsGuru',
    description:
      "Marketing site and conversion funnel for an Indian ed-tech platform with 150k+ learners that also runs a high-commission affiliate program. Mobile-first, fast on budget Android devices, with clear upgrade paths to Plus and Pro memberships.",
    tech: ['WordPress', 'Custom Theme', 'Funnel/Conversion UX', 'Responsive', 'Payment Integration'],
    link: 'https://www.leadsguru.in/',
    linkLabel: 'Visit site',
    external: true,
    mock: {
      kind: 'leadsguru',
    },
    caseStudy: {
      role: 'Web Developer',
      timeline: '2024',
      overview:
        "LeadsGuru is a skills-based ed-tech platform in India offering courses plus a same-day-payout affiliate program. The marketing site is where learners decide to sign up and where affiliates decide to promote.",
      challenge:
        'Two audiences on the same site — learners and affiliates — each needing different proof points. Huge share of traffic is on low-end Android devices on patchy networks, so weight budget and perceived speed were non-negotiable.',
      approach: [
        'Mobile-first layouts with conservative image weight and lazy loading — tuned for sub-3s LCP on 3G.',
        'Separate funnels for course discovery vs. affiliate signup, sharing the same design language so the brand feels coherent.',
        'Clear, high-contrast CTAs and membership comparison tables — no surprises on pricing.',
        'Integrated with payment and membership flows without hijacking the browsing experience.',
      ],
      stack: ['WordPress', 'Custom theme', 'PHP', 'Payment gateway integration', 'Responsive CSS'],
      outcomes: [
        'Faster page loads on low-end devices — the primary traffic source.',
        'Clean conversion paths for both learner and affiliate audiences.',
      ],
    },
  },

  {
    id: 5,
    badge: 'Brand consultancy',
    bgClass: 'pv-jajabor',
    meta: 'PR · Brand Strategy · India',
    title: 'Jajabor Brand Consultancy',
    description:
      "Built a refined, editorial-feel site for a New Delhi brand consultancy working with Fortune 500s, startups and think tanks. Clean typography, scroll-driven reveals, and a case-study-first architecture that puts storytelling front and centre.",
    tech: ['React', 'Tailwind', 'GSAP', 'Headless CMS', 'Responsive'],
    link: 'https://jajabor.io/',
    linkLabel: 'Visit site',
    external: true,
    mock: {
      kind: 'jajabor',
    },
    caseStudy: {
      role: 'Frontend Developer',
      timeline: '2024',
      overview:
        "Jajabor is India's dedicated PR + brand-strategy consultancy, operating at the intersection of media, storytelling and creative distribution. The site had to feel like their work — calm, editorial, confident.",
      challenge:
        'Their previous site looked like a generic agency template. The new one needed restraint: no animation-for-animation-sake, but motion that supports the reading experience.',
      approach: [
        'Editorial typography system and generous whitespace so long-form case studies read like magazine features.',
        'Scroll-driven reveals with GSAP + ScrollTrigger that respect prefers-reduced-motion.',
        'Case-study-first IA — the service pillars connect into work examples instead of sitting as dry list pages.',
        'Mobile-first responsiveness so the editorial feel holds up on a phone.',
      ],
      stack: ['React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Headless content model'],
      outcomes: [
        'Brand site that feels distinct from generic PR agency templates.',
        'Accessible motion — reveals respect user motion preferences.',
      ],
    },
  },

  {
    id: 6,
    badge: 'B2B',
    bgClass: 'pv-kiss',
    meta: 'B2B · Office Tech · Australia',
    title: 'KISS Professional Solutions',
    description:
      "Marketing site for an Australian office-technology provider (managed print, VoIP phone systems, security) serving 3,000+ organisations out of 5 locations. Clean service architecture, city-specific landing pages (Melbourne/Sydney/Gippsland), frictionless quote flow.",
    tech: ['WordPress', 'Elementor', 'Custom CSS', 'Local SEO', 'Conversion UX'],
    link: 'https://kissps.com.au/',
    linkLabel: 'Visit site',
    external: true,
    mock: {
      kind: 'kiss',
    },
    caseStudy: {
      role: 'Freelance Web Developer',
      timeline: '2023',
      overview:
        "KISS sells office technology end-to-end — managed print, communications, security — to Australian organisations. Their site is a discovery + quote-request tool for ops/IT leads.",
      challenge:
        'Broad service catalogue (print, phones, security, health-vertical solutions) plus city-specific offerings. Information needed to be navigable without making the site feel like a spreadsheet.',
      approach: [
        'Service-category IA with dedicated deep-dive pages (e.g. Phone Systems, DECT & WiFi Phones, Managed Print).',
        'City landing pages for Melbourne, Sydney and Gippsland — built for local SEO with real location data.',
        'Frictionless quote request form threaded through every relevant page.',
        'Tight, on-brand custom CSS layered over Elementor to avoid the "builder look".',
      ],
      stack: ['WordPress', 'Elementor', 'Custom CSS', 'ACF', 'Local SEO schema'],
      outcomes: [
        'Clear navigation across a large service catalogue.',
        'City-specific pages ranking locally for phone-system searches.',
      ],
    },
  },

  {
    id: 7,
    badge: 'Storytelling',
    bgClass: 'pv-deqollab',
    meta: 'Storytelling · Creative',
    title: 'deQollab',
    description:
      "A visual storytelling marketing site. Hand-crafted illustrations paired with smooth scroll-driven reveals so every section reads like a chapter of the brand's story — not a list of services.",
    tech: ['WordPress', 'Custom Theme', 'GSAP', 'Illustrations', 'Animations'],
    link: 'http://deqollab.com/',
    linkLabel: 'Visit site',
    external: true,
    mock: {
      kind: 'deqollab',
    },
    caseStudy: {
      role: 'Freelance Web Developer',
      timeline: '2022',
      overview:
        "deQollab is built around the idea that stories are the most powerful brand asset. Their marketing site had to embody that — every scroll should feel like a page turn.",
      challenge:
        "Animation-heavy sites usually get slow and inaccessible fast. The challenge was keeping things fluid without blowing the performance or accessibility budget.",
      approach: [
        'Custom illustrations baked into a sectioned layout — each section is a narrative beat.',
        'Scroll-driven reveals using GSAP + ScrollTrigger, respecting prefers-reduced-motion.',
        'Image optimization and lazy loading so the motion never comes at the cost of page weight.',
        'Simple content model in WordPress so non-dev editors can update copy without breaking the rhythm.',
      ],
      stack: ['WordPress', 'Custom theme', 'GSAP', 'ScrollTrigger', 'Sass'],
      outcomes: [
        'A site that matches the brand promise — feels like reading a story, not clicking a menu.',
        'Motion stays smooth on mid-range devices.',
      ],
    },
  },

  {
    id: 8,
    badge: 'E-commerce',
    bgClass: 'pv-jaipur',
    meta: 'E-commerce · Lifestyle',
    title: 'Jaipur Pink (e-commerce)',
    description:
      "Heavily-customised WooCommerce build for a heritage-craft lifestyle brand. On-brand catalogue experience, product-variation handling, and a repeat-purchase-friendly checkout.",
    tech: ['WordPress', 'WooCommerce', 'Theme Customization', 'UX'],
    mock: {
      kind: 'jaipur',
    },
    caseStudy: {
      role: 'Freelance Web Developer',
      timeline: '2021',
      overview:
        "A heritage-craft brand needed an online store that didn't look like every other Woo template — catalog pages had to feel curated, and the checkout had to stay frictionless.",
      challenge:
        'Product variations (sizes, colourways, handcraft batches) make default Woo templates feel cramped. Owner worked closely on aesthetic direction and iteration speed mattered.',
      approach: [
        'Theme customization layered on top of a battle-tested Woo parent theme — not a from-scratch rebuild.',
        'Custom product gallery and variation selector for handcraft colourways.',
        'Streamlined checkout and integrated add-ons (reviews, wishlist, shipping rules).',
        'Close feedback loop with the founder, iterating weekly.',
      ],
      stack: ['WordPress', 'WooCommerce', 'Custom CSS/PHP', 'WooCommerce extensions'],
      outcomes: [
        'Storefront that feels curated rather than templated.',
        'Cleaner checkout with fewer drop-off points.',
      ],
    },
  },

  {
    id: 9,
    badge: 'Ed-tech',
    bgClass: 'pv-edutech',
    meta: 'EdTech · Platform',
    title: 'Online Learning Platform',
    description:
      "Front-end for a full online-learning platform — student registration, course purchases, in-app credits, and completion certificates. Built so a non-dev team can publish new courses without touching code.",
    tech: ['React', 'JavaScript', 'jQuery', 'Payment Integration', 'Auth'],
    mock: {
      kind: 'edutech',
    },
    caseStudy: {
      role: 'Frontend Developer',
      timeline: '2021',
      overview:
        "A standalone ed-tech product covering the full student journey — signup, browsing, purchase, lessons, certification — plus an in-app currency used for course transactions.",
      challenge:
        'Every ed-tech platform says "courses and certificates". The interesting part is making registration, payment, credits and progress all feel like one coherent product.',
      approach: [
        'Component-driven React front-end so course cards, lesson players and progress UI share a single design system.',
        'Payment integration and in-app credit wallet wired into the purchase flow.',
        'Certification on course completion, generated and delivered automatically.',
        'Admin tooling so the content team adds new courses without developer hand-holding.',
      ],
      stack: ['React', 'JavaScript', 'jQuery (legacy bits)', 'Payment gateway', 'REST API'],
      outcomes: [
        'Full student journey — signup to certificate — on a single unified UI.',
        'Content team ships new courses independently.',
      ],
    },
  },

  {
    id: 10,
    badge: 'E-commerce',
    bgClass: 'pv-cosmetics',
    meta: 'E-commerce · Beauty',
    title: 'Cosmetics Reseller Store',
    description:
      "Full WooCommerce build for a beauty reseller — responsive catalogue, secure payment gateway, and an order flow tuned for repeat purchases and subscription-adjacent behaviour.",
    tech: ['WordPress', 'WooCommerce', 'Payment Gateway', 'Responsive'],
    mock: {
      kind: 'cosmetics',
    },
    caseStudy: {
      role: 'Freelance Web Developer',
      timeline: '2020',
      overview:
        "An independent beauty reseller needed an online store that could handle a growing catalogue, multiple brands and a healthy repeat-customer base.",
      challenge:
        'Beauty shoppers compare hard. Product pages needed rich detail (ingredients, shades, reviews) without becoming unreadable, and checkout had to be frictionless on mobile.',
      approach: [
        'Responsive catalogue layout with category and brand filters.',
        'Product pages with structured sections for ingredients, usage and reviews.',
        'Payment-gateway integration with secure checkout and saved-address flow.',
        'Order management tuned for repeat purchases — reorder shortcuts, email receipts, restock notifications.',
      ],
      stack: ['WordPress', 'WooCommerce', 'Custom CSS/PHP', 'Payment gateway', 'Mailer integration'],
      outcomes: [
        'Mobile-friendly checkout with fewer abandonment points.',
        'Catalogue scales as brand roster grows.',
      ],
    },
  },
];
