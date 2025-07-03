# Release Viewer 🚀

A clean and intuitive web tool for browsing GitHub repository release notes.

## 📦 Overview

Release Viewer helps you easily browse and explore release information from any GitHub repository. Whether you're tracking updates across multiple projects or diving deep into specific release notes, this tool provides a streamlined experience for staying up-to-date with your favorite open source projects.

## ✨ Key Features

### 📋 Release List

- View all releases from any GitHub repository in chronological order
- **Infinite scroll pagination** for smooth browsing of large release histories
- See release tags, dates, and titles at a glance
- Clear identification of pre-releases and beta versions
- Direct links to view releases on GitHub
- **Smart loading states** with skeleton placeholders for better UX

### 📖 Release Details

- Beautiful rendering of Markdown-formatted release notes
- Easy-to-read display of changes, new features, and bug fixes
- Proper rendering of links, images, and code snippets

### 🔍 Smart Search & Navigation

- Search repositories using either `owner/repo` format or full GitHub URLs
- Search history with quick access to recently viewed repositories
- URL synchronization - share direct links to specific repositories
- Popular repositories suggestions to get started quickly

### 🎨 Modern User Experience

- Responsive design that works perfectly on desktop and mobile
- Clean, intuitive interface with smooth interactions
- Dark mode and light mode support
- **Infinite scroll pagination** for seamless browsing of large repositories
- Fast loading and seamless navigation
- **Real-time error handling** with user-friendly messages

## 💡 How to Use

### Getting Started

1. **Enter a Repository**: Type a GitHub repository in one of these formats:
   - Repository format: `microsoft/vscode`, `facebook/react`, `nuxt/nuxt`
   - Full URL: `https://github.com/microsoft/vscode`

2. **Browse Releases**: The release list appears automatically, showing all available releases with infinite scroll for large repositories

3. **View Details**: Click on any release to see the full release notes and details

4. **Quick Access**: Use the search history or popular repositories for faster navigation

### Tips

- **Direct URLs**: You can bookmark or share URLs with specific repositories
- **Search History**: Your recent searches are saved for quick access
- **Popular Repos**: Try the suggested popular repositories to explore the tool
- **Mobile Friendly**: Works great on phones and tablets
- **Infinite Scroll**: Automatically loads more releases as you scroll down
- **Smart Loading**: Skeleton placeholders show while content is loading

## 🛠️ Tech Stack

- **Nuxt 4** - Full-stack Vue.js framework with compatibility version 4
- **TypeScript** - Type-safe development
- **NuxtUI v3** - Modern UI component library with semantic theming
- **VueUse** - Vue composition utilities
- **@octokit/rest** - Official GitHub REST API client
- **Tailwind CSS** - Utility-first CSS framework

## 💭 Motivation

Honestly, I just needed this for work.

## 🎯 Future Plans

| Status | Feature | Description |
|--------|---------|-------------|
| ✅ | Pagination for large repositories | Implemented with infinite scroll |
| ✅ | Direct GitHub API access | Implemented with @octokit/rest |
| 🔄 | Search suggestions and autocomplete from npm registry | Smart search with package suggestions |
| 🔄 | UI improvements and accessibility enhancements | Better UX and a11y support |
