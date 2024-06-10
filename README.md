<img width="1831" alt="image" src="https://github.com/palerique/wwaterjugriddle/assets/887250/7bb843fb-20ca-4534-9499-7f422a9c6c3a">

# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

-   `docs`: a [Next.js](https://nextjs.org/) app
-   `web`: another [Next.js](https://nextjs.org/) app
-   `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
-   `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to
share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't
have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with
your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

-   [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
-   [Caching](https://turbo.build/repo/docs/core-concepts/caching)
-   [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
-   [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
-   [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
-   [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Prompts to create commit messages on IntelliJ IDEA

```text
Ensure commit messages strictly adhere to the following format:

<type>[optional scope]: <subject/description>

[optional body]

[optional footer(s)]


Additional requirements:

Use valid commit types (build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test).
Types should be lowercase.
Include a type and a subject in each commit.
Use lowercase for the subject and don't end it with a period.
Subject should be a succinct imperative sentence (max 50 characters).
Limit the subject line to 50 characters.
Include a leading blank line before the body.
Subject should be followed by an empty line and a more detailed explanation (this is known as body).
Limit each line in the body to 100 characters.
Ensure a leading blank line before the footer.
Limit each line in the footer to 100 characters.
End each commit message with a reference to the Jira task in the format Refs #[LOS-568].
```

```text
Generate a commit message in the following format:
---
[type]: [subject]

[body]

[footer]
---

Constraints:

[type]: Choose one of 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test' (all lowercase) based on the changes in the commit.

Include [type] and [subject] in each commit.

[subject]: Write a succinct imperative sentence in lowercase, no period, and limit it to 50 characters.

[body]: Provide a more detailed explanation after the subject, with each line limited to 100 characters. End the body with a blank line.

[footer]: Start the footer on a new line and limit each line to 100 characters.

These are placeholders and should not be present on the commit message, but should be replaced: [footer], [body], [subject], [type]
```

```text
Ensure commit messages strictly adhere to the following format:

<type>[optional scope]: <subject/description>

[optional body]

[optional footer(s)]

Additional requirements:

Use valid commit types (build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test).
Types should be lowercase.
Include a type and a subject in each commit.
Subject should be a succinct imperative sentence (max 50 characters).
Use lowercase for the subject and avoid ending it with a period.
Limit the subject line to 50 characters.
Include a leading blank line before the body.
Subject should be followed by an empty line and a more detailed explanation (this is known as body).
Limit each line in the body to 100 characters.
Ensure a leading blank line before the footer.
Limit each line in the footer to 100 characters.
```
