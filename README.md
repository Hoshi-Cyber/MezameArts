# Mezame Arts Monorepo

This repository contains a scaffolded implementation of **Mezame Arts**, a multi-artist
online art marketplace.  The project is organised as a monorepo using npm
workspaces with the following structure:

* `apps/web` – Next.js 14 application implementing the user-facing website.
* `apps/api` – Fastify-based Node service providing REST/GraphQL endpoints.
* `packages/ui` – Shared React component library built from the supplied design tokens.
* `packages/types` – Shared TypeScript interfaces used across the monorepo.
* `packages/analytics` – Event definitions and a simple client for tracking analytics events.
* `packages/config` – Centralised configuration constants (site name, base URL).
* `content` – JSON schemas, seeded content, and SEO JSON‑LD templates.
* `emails` – Transactional email templates in MJML format.
* `legal` – Markdown source for terms of service, privacy policy, cookies, and DMCA.
* `iac` – Terraform placeholders for infrastructure provisioning.
* `ci` – GitHub Actions workflow configuration.
* `qa`, `security`, `privacy`, `env`, `dns` – Quality assurance artefacts, role-based access
  controls, consent configuration, environment variable template, and DNS records.

## Development

Install dependencies and run the development servers:

```sh
npm install
npm run dev --workspace=apps/web # start the Next.js app
npm run dev --workspace=apps/api # start the API server
```

### Environment

Copy `.env.template` to `.env` in the `env` directory and fill in the required
variables (database connection string, Stripe keys, KYC provider keys, etc.).  If
keys are missing the application will run in **mock mode** with dummy
implementations.

## Building

Run `npm run build` to build all packages.  Static assets and server builds
will be output to the `dist` folder at the repository root.

## Testing

This scaffold includes placeholders for Playwright tests and Lighthouse CI
budgets.  Tests reside under the `qa/` directory and should be implemented
according to the user flows described in the Delivery & QA playbook.

## Notes

This codebase provides a skeleton implementation that prioritises clear
structure, type‑safety, and ease of extension.  Many features (stripe
integration, KYC/AML provider abstraction, search indexers) are stubbed or
simplified for demonstration purposes.  Refer to the docx files and supplied
assets for detailed requirements and extend the modules accordingly.

