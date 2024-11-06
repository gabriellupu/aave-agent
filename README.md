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

Bitte Karma Agent facilitates the development of AI-powered tools for evaluating account karma. The template supports creating, managing, and deploying karma assessment functionalities. [Build your own agent](https://docs.mintbase.xyz/ai/assistant-plugins)

### API Base URL

https://bitte-karma-agent.vercel.app

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
pnpm dev
```

## Demo

https://github.com/alexastrum/bitte-karma-agent/assets/838839/3291eaf9-aa79-4c95-8c5f-673a6d72dc96

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
