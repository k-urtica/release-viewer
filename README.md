# Release Viewer 🚀

A clean and intuitive web tool for browsing GitHub repository release notes.

![Release Viewer](https://github.com/user-attachments/assets/8362c148-aff4-4204-862e-fdfe55eda656)

## 📦 Overview

Release Viewer helps you easily browse and explore release information from any GitHub repository. Whether you're tracking updates across multiple projects or diving deep into specific release notes, this tool provides a streamlined experience for staying up-to-date with your favorite open source projects.

## 🌐 Site URL

[https://release-viewer.web-toolbox.dev/](https://release-viewer.web-toolbox.dev/)

## ✨ Key Features

- **Release List**: Chronological view of all releases, with infinite scroll, tags, pre-release/beta identification, and direct GitHub links.
- **Release Details**: Beautiful Markdown rendering, with support for links, images, and code snippets.
- **Smart Search & Navigation**:
  - Search by `owner/repo`, full GitHub URL, or npm package name (with suggestions in 'package-name → owner/repo' format).
  - UI avoids confusion even when multiple packages point to the same repository.
  - Quick access to search history and popular repositories.
  - Direct repository links and URL synchronization for sharing.
- **Modern UX**: Responsive, mobile-friendly, dark/light mode, fast navigation, skeleton loading, and real-time error handling.

## 💡 How to Use

1. **Enter a Repository**:
   - Use `owner/repo` (e.g., `microsoft/vscode`), a full GitHub URL, or an npm package name to get suggestions.
2. **Browse Releases**:
   - Releases load automatically with infinite scroll.
3. **View Details**:
   - Click a release to see full notes and metadata.
4. **Quick Access**:
   - Use search history or popular repositories for fast navigation.

### Tips

- Bookmark/share direct URLs (e.g., `/repo/microsoft/vscode`)
- Your recent searches are saved for convenience
- Try popular repositories to explore the tool
- Works great on phones and tablets

## 🛠️ Tech Stack

- **Nuxt 4**
- **TypeScript**
- **NuxtUI v3** (semantic theming)
- **Tailwind CSS**
- **Cloudflare** (hosting)

## ⚡ Performance & Caching

Release Viewer uses intelligent edge caching to provide fast response times while respecting GitHub API rate limits:

- **Browser Cache**: 10 minutes - keeps recently viewed releases available for quick re-access
- **Edge Cache**: 4 hours - reduces server load and GitHub API calls for popular repositories
- **Cache Strategy**: Automatic cache invalidation ensures fresh data while maximizing performance

This caching approach significantly improves user experience, especially when browsing popular repositories or revisiting recently viewed releases.

## 💭 Motivation

Honestly, I just needed this for work.
