# Bitte Karma Agent

Agent for quick lookup of a subjective account karma based on the account activity history across the NEAR ecosystem.

## Overview

Bitte Karma Agent is a tool for assessing account karma based on activity history within the NEAR ecosystem. Built using Next.js 14 + Elysia.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://bitte-karma-agent.vercel.app/)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falexastrum%2Fbitte-karma-agent)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-AI-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

## Project Walkthrough

Bitte Karma Agent facilitates the development of AI-powered tools for evaluating account karma. The template supports creating, managing, and deploying karma assessment functionalities, starting with badges. [Build your own agent](https://docs.mintbase.xyz/ai/assistant-plugins)

### Example: Badges of Blockchain Relevant Achievements

You can use Bitte Karma Agent to assign and display badges for various blockchain-related achievements. Here are some examples:

- **Early Adopter**: ![Early Adopter](https://img.shields.io/badge/Early%20Adopter-blue)
- **Frequent Trader**: ![Frequent Trader](https://img.shields.io/badge/Frequent%20Trader-green)
- **Community Contributor**: ![Community Contributor](https://img.shields.io/badge/Community%20Contributor-yellow)
- **Security Auditor**: ![Security Auditor](https://img.shields.io/badge/Security%20Auditor-red)
- **Smart Contract Developer**: ![Smart Contract Developer](https://img.shields.io/badge/Smart%20Contract%20Developer-purple)

### API Base URL

<https://bitte-karma-agent.vercel.app>

### Endpoints

- Account Karma `GET` `/api/karma/{account}`

### Usage

Make LLM requests to the endpoints above. Refer to the full API documentation for detailed parameter and response information.

## Getting Started

[Docs to integrate](https://docs.mintbase.xyz/ai/assistant-plugins)

### Installation

Set `NEAR_ENV="mainnet"` in your `.env.local` file.

```bash
# install dependencies
pnpm i

# start the development server
pnpm dev:next

# start the agent development server
pnpm dev:agent
```

## Demo

https://github.com/alexastrum/bitte-karma-agent/assets/838839/3291eaf9-aa79-4c95-8c5f-673a6d72dc96

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Agent registration

```bash
make-agent register https://bitte-karma-agent.vercel.app
```

### Agent redeployment

```bash
make-agent deploy -u https://bitte-karma-agent.vercel.app
```

## Troubleshooting

- Errors starting the Next.js development server:
  - Use ai to troubleshoot the error message
- Errors starting the agent development server:
  - Try again in 24 hours
- Unexpected response from the agent:
  - Check response from https://localhost:3000/api/ai-plugin
  - Check response from your plugin API endpoints
  - Check the tunneling service url
- Error deploying the agent:
  - Check validity of https://bitte-karma-agent.vercel.app/api/ai-plugin openapi schema
