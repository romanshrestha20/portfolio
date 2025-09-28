
# 🚀 Roman Shrestha's Portfolio

[![pages-build-deployment](https://github.com/romanshrestha20/portfolio/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/romanshrestha20/portfolio/actions/workflows/pages/pages-build-deployment)
[![Deploy](https://github.com/romanshrestha20/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/romanshrestha20/portfolio/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.15.0-FF5722?logo=framer)](https://www.framer.com/motion/)

Welcome to my personal portfolio website! This modern, interactive portfolio showcases my journey as an aspiring software engineer and web developer. Built with cutting-edge technologies and featuring smooth animations, dark mode support, and a fully responsive design.

🌐 **Live Demo:** [https://romanshrestha.info](https://romanshrestha.info)

---

## 📋 Table of Contents

* [✨ Features](#-features)
* [🛠️ Technologies Used](#️-technologies-used)
* [⚡ Quick Start](#-quick-start)
* [📁 Project Structure](#-project-structure)
* [🖼️ Screenshots](#️-screenshots)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [📞 Contact](#-contact)

---

## ✨ Features

* **🎨 Modern UI/UX**: Clean, professional design with smooth animations using Framer Motion
* **📱 Fully Responsive**: Optimized for all devices - desktop, tablet, and mobile
* **🌙 Dark Mode Support**: Seamless light/dark theme toggle with persistent preferences
* **💼 Project Showcase**: Interactive project cards with expandable descriptions and live links
* **🎯 Skills Visualization**: Animated skill icons with hover effects
* **📈 Educational Timeline**: Interactive timeline showing academic journey with current year highlighting
* **📧 Contact Integration**: Functional contact form powered by EmailJS
* **⚡ Performance Optimized**: Lazy loading, code splitting, and optimized bundle size
* **🔍 SEO Ready**: Meta tags, Open Graph support, and search engine optimization
* **🚀 Modern Tech Stack**: Built with React 19, Tailwind CSS, and Material-UI components

---

## 🛠️ Technologies Used

### **Frontend Framework**
* **React 19.0.0** - Latest React with concurrent features
* **JavaScript (ES6+)** - Modern JavaScript features

### **Styling & UI**
* **Tailwind CSS 3.4.17** - Utility-first CSS framework
* **Material-UI 6.3.0** - React components with Material Design
* **Framer Motion 11.15.0** - Production-ready motion library
* **Custom CSS** - Additional styling and animations

### **Icons & Assets**
* **Lucide React** - Beautiful, customizable icons
* **React Icons** - Popular icon packs for React
* **Google Fonts** - Poppins, Roboto Mono, Ubuntu fonts

### **Functionality**
* **EmailJS** - Contact form email integration
* **React Router DOM** - Client-side routing
* **JS Cookie** - Cookie management for theme persistence

### **Development & Build**
* **React Scripts 5.0.1** - Build tools and configuration
* **PostCSS & Autoprefixer** - CSS processing
* **GitHub Actions** - CI/CD pipeline
* **GitHub Pages** - Static site hosting

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/romanshrestha20/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Set up environment variables (optional)
# Create a .env file in the root directory for EmailJS configuration:
# REACT_APP_EMAILJS_SERVICE_ID=your_service_id
# REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id  
# REACT_APP_EMAILJS_USER_ID=your_user_id

# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run deploy     # Deploy to GitHub Pages
```

---

## 📁 Project Structure

```plaintext
portfolio/
├── 📁 public/                    # Static assets
│   ├── 🖼️ images/               # Screenshots and media
│   ├── 🎨 boy.png               # Profile assets
│   ├── 🌐 index.html            # HTML template
│   └── 📄 manifest.json         # PWA configuration
│
├── 📁 src/                      # Source code
│   ├── 📁 components/           # React components
│   │   ├── 📁 about/            # About section components
│   │   │   ├── About.jsx        # Main about component
│   │   │   ├── AboutText.jsx    # About text content
│   │   │   ├── ProfileCard.jsx  # Profile image & CV download
│   │   │   ├── SocialLinks.jsx  # Social media links
│   │   │   └── Timeline.jsx     # Educational timeline ⭐ NEW
│   │   │
│   │   ├── 📁 common/           # Reusable components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── SectionHeader.jsx
│   │   │   ├── SectionWrapper.jsx
│   │   │   └── Spinner.jsx
│   │   │
│   │   ├── 📁 contact/          # Contact form components
│   │   │   ├── Contact.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactInput.jsx
│   │   │   └── ValidateField.js
│   │   │
│   │   ├── 📁 footer/           # Footer component
│   │   ├── 📁 home/             # Home page component
│   │   ├── 📁 navbar/           # Navigation component
│   │   ├── 📁 projects/         # Project showcase
│   │   ├── 📁 skills/           # Skills visualization
│   │   │
│   │   ├── DarkModeToggle.jsx   # Theme switcher
│   │   ├── HamburgerMenu.jsx    # Mobile navigation
│   │   └── NotFound.jsx         # 404 page
│   │
│   ├── 📁 config/               # Configuration files
│   │   └── sections.js          # Section lazy loading config
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   └── useDarkMode.jsx      # Dark mode management
│   │
│   ├── App.js                   # Main app component
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles
│
├── 📄 tailwind.config.js        # Tailwind configuration
├── 📄 package.json              # Dependencies & scripts
└── 📄 README.md                 # Project documentation
```

### 🏗️ Component Architecture

- **🧩 Modular Design**: Each section is a separate component for maintainability
- **♻️ Reusable Components**: Common components used across sections
- **⚡ Lazy Loading**: Components are dynamically imported for better performance
- **🎨 Consistent Styling**: Shared Tailwind classes and design system
- **📱 Responsive**: Mobile-first design approach

---

## 🖼️ Screenshots

### 🏠 Home & About Section
![Home](public/images/homepage.png)
*Clean introduction with animated profile section and educational timeline*

### 💼 Projects Showcase
![Projects](public/images/projects.png)
*Interactive project cards with expandable descriptions and live links*

### 🎯 Skills Visualization
![Skills](public/images/skills.png)
*Animated skill icons with hover effects and technology stack*

### 📧 Contact Form
![Contact Form](public/images/contact-form-screenshot.png)
*Functional contact form with validation and email integration*

### 📱 Responsive Design
The portfolio is fully responsive and provides an optimal viewing experience across all devices.

---

## 🚀 Key Features Highlights

### 🎨 **Modern Design System**
- Consistent color palette with light/dark mode support
- Smooth animations and micro-interactions
- Professional typography using Google Fonts

### 📚 **Educational Timeline**
- Automatically detects and highlights current academic year
- Visual progress indicator with custom animations
- Responsive design for all screen sizes

### 💼 **Dynamic Project Cards**
- Expandable descriptions with "Read More" functionality
- Hover effects and smooth transitions
- External link integration for live demos

### 🌙 **Advanced Dark Mode**
- System preference detection
- Cookie-based persistence
- Smooth theme transitions

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Here's how you can contribute:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **📝 Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **📤 Push to the branch** (`git push origin feature/AmazingFeature`)
5. **🔄 Open a Pull Request**

### 🐛 Found a Bug?
Please open an issue with:
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Contact

### 🌐 **Live Portfolio**
Visit [https://romanshrestha.info](https://romanshrestha.info) to see the portfolio in action!

### 📧 **Get In Touch**
- **Email**: [stha.roman20@outlook.com](mailto:stha.roman20@outlook.com)
- **Contact Form**: Available on the website with EmailJS integration
- **Response Time**: Usually within 24-48 hours

### 🔗 **Connect With Me**
- **LinkedIn**: [linkedin.com/in/romanshrr](https://linkedin.com/in/romanshrr/)
- **GitHub**: [github.com/romanshrestha20](https://github.com/romanshrestha20)
- **Instagram**: [instagram.com/romanshrr](https://instagram.com/romanshrr/)

### 💼 **Professional Opportunities**
I'm actively seeking:
- **Internship opportunities** in software engineering
- **Web development projects** and collaborations
- **Open source contributions** and community involvement

---

## � Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations
- **Material-UI** for beautiful components
- **EmailJS** for contact form functionality
- **GitHub Pages** for free hosting
- **Unsplash** for beautiful stock photos

---

## 📈 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/romanshrestha20/portfolio)
![GitHub last commit](https://img.shields.io/github/last-commit/romanshrestha20/portfolio)
![GitHub stars](https://img.shields.io/github/stars/romanshrestha20/portfolio?style=social)

---

**⭐ If you found this portfolio helpful or inspiring, please consider giving it a star!**

*Built with ❤️ by Roman Shrestha*
