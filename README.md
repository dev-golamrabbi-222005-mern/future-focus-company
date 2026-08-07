<div align="center">

# 🌍 Future Focus Company - Your HR Partner & Resource Solutions
**Premium Manpower & Workforce Solutions Portal for Saudi Arabia and the GCC**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![n8n](https://img.shields.io/badge/n8n-FF6C37?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io/)

A high-performance, multilingual corporate web application designed to connect GCC employers with verified, skilled international talent from over 10 countries.

</div>

---

## 📖 Overview

The **Future Focus Company** website is a modern, conversion-optimized platform built with a dark-themed, premium corporate aesthetic. It serves as a dual-purpose portal: a professional B2B lead generation tool for GCC employers (Primary Audience) and a trusted job application gateway for international candidates (Secondary Audience).

The platform features buttery-smooth scroll animations, flawless multi-language support (including Right-to-Left Arabic), and an integrated AI virtual assistant for automated candidate screening and employer inquiries.

---

## ✨ Key Features

*   **🌐 Full i18n Localization:** Seamless support for **English (en)**, **Bengali (bn)**, and **Arabic (ar)** with automatic RTL layout switching.
*   **🎨 Premium Dark Mode UI:** Deep blue/ocean aesthetics built with Tailwind CSS, ensuring a high-end corporate identity.
*   **🎬 Advanced GSAP Animations:** Buttery-smooth scroll triggers, staggered reveals, and dynamic process timelines.
*   **🤖 Smart AI Lead Generation:** Integrated floating chat widget powered by a custom **n8n AI Agent** (Gemini) that collects leads directly into Google Sheets.
*   **⚡ Edge-Ready Performance:** Built on Next.js App Router for optimal SEO, server-side rendering, and instant page loads.
*   **📱 Fully Responsive:** Carefully crafted layouts that look perfect on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | GSAP (`@gsap/react`, `ScrollTrigger`) |
| **Icons** | Lucide React |
| **Localization** | `next-intl` |
| **AI Integration** | n8n (Webhook + AI Agent Node) + Gemini 1.5 Flash-Lite |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── [locale]/               # i18n routing (en, bn, ar)
│   │   ├── (employer)/         # Employer-focused routes (Manpower, Industries)
│   │   ├── (candidate)/        # Candidate-focused routes (Careers)
│   │   └── page.tsx            # Main Homepage
│   └── api/
│       └── chat/               # API route for n8n Webhook communication
├── components/
│   ├── layout/                 # Navbar, Footer, Language Switcher
│   ├── features/               # Complex UI modules (GSAP Timelines, Bento Grids)
│   ├── chat/                   # Floating AI Chat Widget
│   └── ui/                     # Reusable micro-components (Buttons, Cards)
└── messages/                   # Translation JSON files
    ├── en.json                 # English strings
    ├── bn.json                 # Bengali strings
    └── ar.json                 # Arabic strings (RTL)

