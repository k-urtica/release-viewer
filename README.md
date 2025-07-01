# Release Viewer

A clean and intuitive web tool for browsing GitHub repository release notes.

## Overview

Release Viewer helps you easily browse and explore release information from any GitHub repository. Whether you're tracking updates across multiple projects or diving deep into specific release notes, this tool provides a streamlined experience for staying up-to-date with your favorite open source projects.

## Key Features

### 📋 Release List

- View all releases from any GitHub repository in chronological order
- See release tags, dates, and titles at a glance
- Clear identification of pre-releases and beta versions
- Direct links to view releases on GitHub

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
- Fast loading and seamless navigation

## How to Use

### Getting Started

1. **Enter a Repository**: Type a GitHub repository in one of these formats:
   - Repository format: `microsoft/vscode`, `facebook/react`, `nuxt/nuxt`
   - Full URL: `https://github.com/microsoft/vscode`

2. **Browse Releases**: The release list appears automatically, showing all available releases

3. **View Details**: Click on any release to see the full release notes and details

4. **Quick Access**: Use the search history or popular repositories for faster navigation

### Tips

- **Direct URLs**: You can bookmark or share URLs with specific repositories
- **Search History**: Your recent searches are saved for quick access
- **Popular Repos**: Try the suggested popular repositories to explore the tool
- **Mobile Friendly**: Works great on phones and tablets

## Perfect For

- **Developers** tracking updates in dependencies and tools
- **Project Managers** monitoring release schedules across projects
- **Open Source Enthusiasts** staying current with favorite projects
- **DevOps Teams** coordinating updates and deployments
- **Anyone** who wants a better way to read GitHub release notes

## Tech Stack

- **Nuxt 3** - Full-stack Vue.js framework
- **TypeScript** - Type-safe development
- **NuxtUI v3** - Modern UI component library
- **VueUse** - Vue composition utilities
- **unjs/ungh** - GitHub API client

## Motivation

Honestly, I just needed this for work.

## Future Plans

- Remove ungh and use direct GitHub API access with personal tokens
- UI improvements
