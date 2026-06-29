export const projects = [
  {
    id: "hamro-pasal",
    issue: "01",
    name: "Hamro Pasal",
    dek: "A marketplace interface focused on browsing products, managing listings, and supporting checkout flow with a clearer catalog structure.",
    image: "/hamro-pasal.png",
    tags: ["React", "E-Commerce", "Frontend"],
    links: {
      live: "https://hamro-pasal-frontend-1dqm.vercel.app/",
      code: "https://github.com/romanshrestha20",
    },
    facts: [
      { label: "Role", value: "Frontend build" },
      { label: "Focus", value: "Catalog clarity" },
      { label: "Format", value: "Case study" },
    ],
    caseStudy: {
      kicker: "Retail Desk",
      headline: "A storefront build that had to make browsing feel simple before it could sell anything.",
      sections: [
        "The strongest part of this project was not a dramatic animation or a novel layout. It was structure. Product browsing only works when categories, hierarchy, and call-to-action placement reduce hesitation instead of adding more scanning work.",
        "I treated the interface like a product shelf. Navigation had to narrow choices quickly, listing cards had to show the right signals first, and the page needed enough consistency that users could compare items without relearning the layout each time.",
        "That meant prioritizing repeatable UI patterns over decoration. The more stable the grid, the easier it became to support search, checkout intent, and trust around product browsing. Visual polish mattered, but only after the page behaved like a reliable catalog.",
        "If I revisit this project with fresh source screenshots, the next improvements would be around checkout-state visibility, stronger product proof on listing cards, and clearer transitions between discovery, selection, and purchase.",
      ],
    },
  },
  {
    id: "django-blog",
    issue: "02",
    name: "Django Blog",
    dek: "A CRUD-driven publishing app for drafting, updating, and managing posts with user authentication and profile support.",
    image: "/Screenshot_25-12-2024_11926_127.0.0.1.jpeg",
    tags: ["Django", "Python", "CRUD"],
    links: {
      code: "https://github.com/romanshrestha20/django-blog",
    },
    facts: [
      { label: "Role", value: "Full stack" },
      { label: "Focus", value: "Author workflow" },
      { label: "Format", value: "Case study" },
    ],
    caseStudy: {
      kicker: "Publishing System",
      headline: "A blog product that taught me how much small workflow friction shapes the writing experience.",
      sections: [
        "This project was useful because it moved beyond static presentation and into behavior. Authentication, profile management, and post editing made the system feel less like a demo and more like a tool with real states to support.",
        "The core challenge was keeping the CRUD flow understandable. Users need to know when they are creating, editing, or reviewing content, and the interface has to reinforce that without forcing them to decode the page every time.",
        "Django made the application structure dependable, but the real lesson was in making a practical author workflow feel readable. Labels, form order, and navigation logic did a lot of invisible work in reducing confusion.",
        "If I expanded this further, I would strengthen editorial metadata, preview states, and moderation-related views so the app communicated more clearly as a multi-step publishing system rather than a simple post manager.",
      ],
    },
  },
  {
    id: "movie-application",
    issue: "03",
    name: "Movie Application",
    dek: "A media browsing interface centered on trending films and television shows with API-powered discovery surfaces.",
    image: "/Screenshot_25-12-2024_0462_mango-rock-0b5b48e10.5.azurestaticapps.net.jpeg",
    tags: ["React", "API", "Media"],
    links: {
      code: "https://github.com/AWAP-Group8-2024/Movie-App.git",
    },
    facts: [
      { label: "Role", value: "Frontend build" },
      { label: "Focus", value: "Content discovery" },
      { label: "Format", value: "Case study" },
    ],
    caseStudy: {
      kicker: "Discovery Flow",
      headline: "An entertainment interface where content density had to stay energetic without turning noisy.",
      sections: [
        "Media products compete for attention with scale, imagery, and constant updates. That makes browsing feel exciting, but it also makes it easy for every section to demand equal attention. The hard part is preserving hierarchy.",
        "This interface worked best when I treated each content row as a clear editorial shelf. Trending, popular, and featured areas needed different visual emphasis, otherwise the screen became a long wall of equally loud posters.",
        "API integration added speed and freshness, but presentation still determined whether the content felt usable. Spacing, grouping, and headline order mattered more than adding more carousels or more categories.",
        "The next round of refinement would focus on stronger featured states, better loading feedback, and detail views that make the transition from browsing to selection feel more intentional.",
      ],
    },
  },
  {
    id: "book-library",
    issue: "04",
    name: "My Book Library",
    dek: "A records-management interface for tracking books and authors with authenticated editing and organized content administration.",
    image: "/Screenshot_29-12-2024_123130_localhost.jpeg",
    tags: ["React", "Backend", "Database"],
    links: {
      code: "https://github.com/romanshrestha20/my-book-library",
    },
    facts: [
      { label: "Role", value: "Full stack" },
      { label: "Focus", value: "Admin clarity" },
      { label: "Format", value: "Case study" },
    ],
    caseStudy: {
      kicker: "Library Desk",
      headline: "A catalog management build where clean relationships mattered more than surface-level styling.",
      sections: [
        "This project centered on books, authors, and the relationships between them. Once a product includes linked records, interface clarity becomes tightly connected to data clarity. Users need to understand what belongs to what.",
        "The useful design lesson here was that admin-style pages should behave like organized paperwork. Good labels, predictable actions, and clean grouping outperform decorative UI when the real goal is maintaining content accurately.",
        "Authentication added a practical boundary around who could change data, while CRUD operations turned the app into a small but credible management system. That made the project stronger than a purely read-only catalog.",
        "If I continue this one, I would deepen search and filtering, make relationship views easier to scan, and show validation or error states more explicitly so the system feels more trustworthy during edits.",
      ],
    },
  },
  {
    id: "clean-sync",
    issue: "05",
    name: "CleanSync",
    dek: "A Kotlin and Jetpack Compose Android app designed around bookings, user management, and notification-oriented service flow.",
    image: "/portfolio-preview.jpeg",
    tags: ["Android", "Kotlin", "Jetpack Compose"],
    links: {
      code: "https://github.com/Mobile-Development-Project-Group-22/CleanSync/",
    },
    facts: [
      { label: "Role", value: "Mobile build" },
      { label: "Focus", value: "Service flow" },
      { label: "Format", value: "Case study" },
    ],
    caseStudy: {
      kicker: "Mobile Workflow",
      headline: "A service app where state, booking steps, and notification logic shaped the product more than visual theme alone.",
      sections: [
        "Mobile apps compress decisions into smaller spaces, so every screen has to be more direct. In this project, booking flow and account behavior mattered more than adding more visual treatments to each view.",
        "Jetpack Compose was useful because it encouraged thinking in reusable interface pieces. That helped the screens stay consistent while still supporting different moments like selection, confirmation, and notification feedback.",
        "What made the project credible was not just that it ran on Android, but that it represented a usable service path. The interface had to move people from account context to service action without losing clarity.",
        "The strongest next iteration would be deeper booking-state visibility, improved service history views, and better mobile screenshot coverage so the case study can show the flow screen by screen.",
      ],
    },
  },
  {
    id: "community-help-platform",
    issue: "06",
    name: "Community Help Platform",
    dek: "A full-stack help marketplace that connects people who need support with nearby helpers through requests, bids, chat, and notifications.",
    image: "/community-help-platform.png",
    tags: ["Expo", "Express", "Prisma"],
    links: {
      code: "https://github.com/romanshrestha20/community-help-platform",
    },
    facts: [
      { label: "Role", value: "Full stack build" },
      { label: "Focus", value: "Local help matching" },
      { label: "Format", value: "Marketplace app" },
    ],
    caseStudy: {
      kicker: "Community Network",
      headline: "A neighborhood help platform where trust, urgency, and multi-step coordination had to work as one product.",
      sections: [
        "This project pushed beyond a single interface and into a full service system. The product had to connect people asking for help with nearby helpers, which meant request creation, discovery, bidding, messaging, and notifications all had to support the same core promise without feeling fragmented.",
        "The backend structure mattered as much as the UI. Authentication, verification, status transitions, realtime conversations, and notification delivery were not side features. They were the pieces that made the marketplace credible, especially for a platform built around time-sensitive or practical local needs.",
        "On the frontend side, the work was about making a complex flow feel direct on mobile. Request discovery, map-based context, saved items, and profile controls had to stay readable even while the product handled more state than a simpler CRUD app.",
        "The next refinement would be stronger production-grade screenshots for the portfolio, deeper proof around trust signals and moderation flows, and tighter presentation of how requests move from posting to accepted help in the live product journey.",
      ],
    },
  },
];
