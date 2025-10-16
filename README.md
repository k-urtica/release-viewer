# Release Viewer 🚀

A clean and intuitive web tool for browsing GitHub repository release notes.

![Release Viewer](https://github.com/user-attachments/assets/f73ec368-c51b-422e-a2ef-19bbfca1e520)

## 📦 Overview

Release Viewer helps you easily browse and explore release information from any GitHub repository. With a modern dashboard-style layout featuring sidebar navigation, you can quickly access your pinned repositories, recently viewed projects, and search history. Whether you're tracking updates across multiple projects or diving deep into specific release notes, this tool provides a streamlined experience for staying up-to-date with your favorite open source projects.

## 🌐 Site URL

[https://release-viewer.web-toolbox.dev/](https://release-viewer.web-toolbox.dev/)

## ✨ Key Features

- **Dashboard-Style Layout**: Clean sidebar navigation with easy access to pinned repositories, recently viewed repositories, and feedback links for streamlined workflow.
- **Release List**: Chronological view of all releases, with infinite scroll, tags, pre-release/beta identification, and direct GitHub links.
- **Release Details**: Beautiful Markdown rendering, with support for links, images, and code snippets.
- **Smart Search & Navigation**:
  - Search by `owner/repo`, full GitHub URL, or npm package name (with suggestions in 'package-name → owner/repo' format).
  - UI avoids confusion even when multiple packages point to the same repository.
  - Quick access to pinned repositories and search history directly from the sidebar.
  - Direct repository links and URL synchronization for sharing.
- **Modern UX**: Responsive, mobile-friendly, dark/light mode with refined color scheme, fast navigation, skeleton loading, custom scrollbar styling, and real-time error handling.

## 💡 How to Use

1. **Enter a Repository**:
   - Use the sidebar search to enter `owner/repo` (e.g., `microsoft/vscode`), a full GitHub URL, or an npm package name to get suggestions.
2. **Pin Your Favorites**:
   - Pin frequently accessed repositories for quick access from the sidebar.
3. **Browse Releases**:
   - Releases load automatically with infinite scroll.
4. **View Details**:
   - Click a release to see full notes and metadata.
5. **Quick Access**:
   - Use the sidebar to access pinned repositories, recently viewed repositories, and search history for fast navigation.

### Tips

- Pin your most-used repositories to the sidebar for instant access
- Bookmark/share direct URLs (e.g., `/repo/microsoft/vscode`)
- Your recent searches and viewed repositories are saved for convenience
- Works great on phones and tablets with responsive sidebar design

## 🛠️ Tech Stack

- **Nuxt v4**
- **TypeScript**
- **NuxtUI v4**
- **Tailwind CSS**
- **Cloudflare Workers**

## ⚡ Performance & Caching

Release Viewer uses intelligent edge caching to provide fast response times while respecting GitHub API rate limits:

- **Browser Cache**: 10 minutes - keeps recently viewed releases available for quick re-access
- **Edge Cache**: 4 hours - reduces server load and GitHub API calls for popular repositories
- **Cache Strategy**: Automatic cache invalidation ensures fresh data while maximizing performance

This caching approach significantly improves user experience, especially when browsing popular repositories or revisiting recently viewed releases.

## 💭 Motivation

Honestly, I just needed this for work.
