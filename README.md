# Subito Client

An alternative client for [Subito.it](https://www.subito.it), one of Italy's most popular marketplace for used items. This client provides enhanced search capabilities and filtering options that aren't available in the official Subito frontend.

## Features

- Advanced filtering options
- Customizable price ranges
- Increased items per page
- Modern, responsive UI
- Real-time search results
- Better search experience

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- React Hook Form
- Zod for validation

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alessandroamella/subito-client.git
cd subito-client
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The development server will be available at `http://localhost:3000`, while the production server will be available at `http://localhost:4387`.

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting

## Project Structure

```
subito-client/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── public/          # Static assets
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is an unofficial client for Subito.it. It is not affiliated with, authorized, maintained, sponsored, or endorsed by Subito or any of its affiliates or subsidiaries. Use at your own risk.
