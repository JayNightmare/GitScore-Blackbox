# GitHub Repository Scorer

A static Next.js application that analyzes GitHub repositories and provides quality scores based on various metrics including stars, forks, documentation, recent activity, and CI/CD workflows.

## Features

- 🔍 **Repository Analysis**: Search any public GitHub repository by owner/repo format
- 📊 **Weighted Scoring**: Get a 0-10 score based on multiple quality metrics
- 💾 **Smart Caching**: Client-side localStorage caching for improved performance
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Static Export**: Deployable to GitHub Pages with no server required
- 🧪 **Unit Tests**: Comprehensive test coverage for scoring algorithms

## Scoring Metrics

The scoring algorithm evaluates repositories based on:

- **Stars** (25% weight): Repository popularity and community adoption
- **Recent Activity** (20% weight): Commit frequency and last update time
- **Documentation** (15% weight): Presence of README file
- **Forks** (15% weight): Community engagement and contributions
- **CI/CD** (15% weight): Automated workflows and quality processes
- **License** (10% weight): Open source licensing

## Getting Started

### Prerequisites

- Node.js 16+ 
- GitHub Personal Access Token with `repo` and `read:user` permissions

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/GitScore-Blackbox.git
cd GitScore-Blackbox
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Add your GitHub token to `.env.local`:
```
GITHUB_TOKEN=your_github_personal_access_token_here
MONGODB_URI=your_mongodb_connection_string_here
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run unit tests:
```bash
npm test
```

### Building for Production

Build and export static files:
```bash
npm run build
npm run export
```

The static files will be generated in the `out/` directory.

## Deployment

### GitHub Pages

1. Update the `basePath` and `assetPrefix` in `next.config.js` to match your repository name
2. Push your code to GitHub
3. The GitHub Action will automatically build and deploy to GitHub Pages

### Manual Deployment

```bash
npm run build
npm run export
npm run gh-pages
```

## Project Structure

```
├── components/          # React components
│   ├── ScoreCard.js    # Score display with animations
│   └── SearchForm.js   # Repository search form
├── lib/                # Core utilities
│   ├── github.js       # GitHub GraphQL API client
│   ├── scoring.js      # Scoring algorithm
│   └── cache.js        # localStorage caching
├── pages/              # Next.js pages
│   ├── _app.js         # App wrapper
│   └── index.js        # Main page
├── styles/             # CSS styles
│   └── globals.css     # Global Tailwind styles
├── __tests__/          # Unit tests
└── .github/workflows/  # GitHub Actions
```

## API Usage

The application uses GitHub's GraphQL API to fetch repository data. Rate limiting is handled gracefully with caching to minimize API calls.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Uses [GitHub GraphQL API](https://docs.github.com/en/graphql) for data fetching
- Deployed on [GitHub Pages](https://pages.github.com/)
