# README Pro - Professional GitHub Profile Creator

<div align="center">
  <img src="https://img.shields.io/badge/README-Pro-purple?style=for-the-badge&logo=github" alt="README Pro">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-GNU GPL v2.0-green?style=for-the-badge" alt="License">
</div>

<div align="center">
  <h3>🚀 Create stunning GitHub profiles with our advanced README generator</h3>
  <p>Professional templates • Real GitHub integration • WYSIWYG editor • 100% Free & Open Source</p>
</div>

---

## 📖 Project Description

README Pro is a comprehensive, web-based tool designed to help developers create professional and visually appealing GitHub profile READMEs. It solves the common problem of spending hours crafting the perfect GitHub profile by providing an intuitive interface, real-time preview, and seamless GitHub integration.

**What problem does it solve?**
- Eliminates the time-consuming process of manually writing markdown
- Provides professional templates for different developer personas
- Offers real-time GitHub data integration
- Ensures consistent, high-quality profile presentation

## ✨ Features

### 🔗 **GitHub Integration**
- Automatic profile data fetching via GitHub API
- Real-time repository synchronization
- GitHub stats and contribution visualization
- Direct deployment to GitHub profile repository
- GitHub Gists integration

### 🛠️ **Skills & Project Management**
- Interactive skills editor with proficiency levels
- Automatic project fetching from GitHub repositories
- Featured project highlighting
- Technology stack visualization


## 🚀 Installation

### Prerequisites

Before installing README Pro, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** or **pnpm** package manager
- **Git** for version control

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajeshepili/readme-pro.git
   cd readme-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   GITHUB_TOKEN=your_github_token_here (optional)
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Production Deployment

For production deployment on Vercel:

1. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Alternative: One-click deploy**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rajeshepili/readme-pro)

## 📚 Usage

### Getting Started

1. **Access the Application**
   - Visit the live demo at [https://readme-pro-re.vercel.app](https://readme-pro-re.vercel.app/)
   - Or run locally following the installation instructions

2. **Create Your Profile**
   - Click "Get Started Free" on the homepage
   - Enter your GitHub username to auto-populate data
   - Customize your profile using the editor tabs

3. **Edit Your Information**
   - **About Tab**: Personal information, bio, and social links
   - **Skills Tab**: Add and categorize your technical skills
   - **Projects Tab**: Showcase your best repositories
   - **Templates Tab**: Choose from professional templates

### Basic Workflow

```bash
# 1. Enter GitHub username
username: "your-github-username"

# 2. Auto-fetch profile data
GET /api/github/user/your-username

# 3. Customize content
- Edit bio and personal information
- Add skills with proficiency levels
- Select featured projects
- Choose template and theme

# 4. Preview and export
- Real-time markdown preview
- Download README.md file
- Deploy directly to GitHub
```

### Advanced Features

#### GitHub API Integration
```typescript
// Fetch user data and repositories
const userData = await githubApi.getUser(username);
const repos = await githubApi.getUserRepos(username);
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="README Pro"

# GitHub Integration (Optional)
GITHUB_TOKEN=your_github_token_here
```

## 💡 Examples

### Example 1: Basic Profile Setup

```typescript
// Basic profile configuration
const profileData = {
  username: "johndoe",
  name: "John Doe",
  bio: "Full-stack developer passionate about React and Node.js",
  location: "San Francisco, CA",
  skills: [
    { name: "React", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" }
  ]
};
```

### Example 4: Generated README Output

```markdown
# Hi there! 👋 I'm John Doe

## About Me
Full-stack developer passionate about React and Node.js

## 🚀 What I'm up to

- 🔭 Currently working on **README Pro**
- 🌱 Currently learning **Machine Learning**

## 🛠️ Skills

### Frontend
- ⚛️ **React** `██████████` 90%
- 🔷 **TypeScript** `████████░░` 80%

### Backend
- 💚 **Node.js** `████████░░` 85%
- 🐍 **Python** `███████░░░` 70%

## 🚀 Featured Projects

### [README Pro](https://github.com/johndoe/readme-pro)
Professional GitHub profile creator with advanced features

**Tech Stack:** TypeScript | ⭐ 150 | 🍴 25
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/readme-pro.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

5. **Commit and push**
   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### Coding Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow the configured rules
- **Prettier**: Code formatting
- **Conventional Commits**: Use semantic commit messages

### Areas for Contribution

- 🐛 **Bug fixes**: Report and fix issues
- ✨ **New features**: Enhance functionality
- 📚 **Documentation**: Improve guides and examples
- 🎨 **Design**: UI/UX improvements
- 🧪 **Testing**: Increase test coverage
- 🌐 **Translations**: Add internationalization

## 📄 License

This project is licensed under the GNU GPL v2 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Technologies Used

- **[Next.js](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)** 
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[shadcn/ui](https://ui.shadcn.com/)**
- **[Radix UI](https://www.radix-ui.com/)** 
- **[React Markdown](https://github.com/remarkjs/react-markdown)**

### Contributors

Special thanks to all contributors who have helped make this project better:

- **[Rajesh Epili](https://github.com/rajeshepili)** - Project creator and maintainer
- **Community Contributors** - Bug reports, feature requests, and improvements

## 📞 Contact

### Project Maintainer

**Rajesh Epili**
- 💼 **LinkedIn**: [linkedin.com/in/rajeshepili](https://linkedin.com/in/rajeshepili)
- 🐙 **GitHub**: [github.com/rajeshepili](https://github.com/rajeshepili)

### Project Links

- 🚀 **Live Demo**: [readme-pro.vercel.app](https://readme-pro.vercel.app)
- 📂 **Repository**: [github.com/rajeshepili/readme-pro](https://github.com/rajeshepili/readme-pro)
- 🐛 **Issues**: [github.com/rajeshepili/readme-pro/issues](https://github.com/rajeshepili/readme-pro/issues)
- 💬 **Discussions**: [github.com/rajeshepili/readme-pro/discussions](https://github.com/rajeshepili/readme-pro/discussions)

## ❓ FAQ

### General Questions

**Q: Is README Pro completely free to use?**
A: Yes! README Pro is 100% free and open-source under the GNU GPL v2 license.

**Q: Do I need to create an account?**
A: No account required! You can start creating your profile immediately.

**Q: Can I use this for commercial projects?**
A: The GNU GPL v2 license allows commercial use with proper attribution.

### Technical Questions

**Q: Which browsers are supported?**
A: All modern browsers including Chrome, Firefox, Safari, and Edge.

**Q: Can I self-host README Pro?**
A: Yes! Follow the installation instructions to run it on your own server.

**Q: How do I integrate with GitHub?**
A: Simply enter your GitHub username, and the tool will fetch your public data automatically.

**Q: Can I export my README in different formats?**
A: Currently supports Markdown export with HTML preview. PDF export is planned for future releases.

### Troubleshooting

**Q: GitHub data not loading?**
A: Ensure your GitHub profile is public and the username is correct. Check your internet connection.

**Q: Preview not updating?**
A: Try refreshing the page or clearing your browser cache.

**Q: Deployment to GitHub failed?**
A: Verify your GitHub token has the correct permissions and the repository exists.

### Getting Help

If you encounter issues not covered here:

1. **Check existing issues**: [GitHub Issues](https://github.com/rajeshepili/readme-pro/issues)
2. **Create a new issue**: Provide detailed information about the problem
3. **Join discussions**: [GitHub Discussions](https://github.com/rajeshepili/readme-pro/discussions)
4. **Contact maintainer**: Use the contact information above

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/rajeshepili">Rajesh Epili</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
