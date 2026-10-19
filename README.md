# hello-custom-action

A small **JavaScript custom GitHub Action** that greets someone and returns the time. I built it for Module 7 of the GitHub Actions Certification Course activity.

- **Author:** Abdul Rafay (`aabdulrafay`)
- **Current version:** `v1.0.0`
- **Used by:** [github-actions-poc](https://github.com/aabdulrafay/github-actions-poc) (workflow `7-custom-action.yml`)

---

## Inputs and outputs

| Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `who-to-greet` | input | yes | `World` | Name of the person to greet |
| `time` | output | | | The time when the greeting was made |

The action also prints who started the workflow (`github.context.actor`) and the event name.

---

## Usage

```yaml
name: 7 Custom Action
on:
  workflow_dispatch:
jobs:
  use-custom-action:
    runs-on: ubuntu-latest
    steps:
      - name: Run my custom action
        id: greet
        uses: aabdulrafay/hello-custom-action@v1.0.0
        with:
          who-to-greet: 'Abdul Rafay'
      - name: Print the output
        run: echo "The time was ${{ steps.greet.outputs.time }}"
```

Example log output:

```
Hello Abdul Rafay! This is my custom action.
Triggered by: aabdulrafay
Event: workflow_dispatch
```

---

## Files in this repository

| File | Purpose |
|---|---|
| `action.yml` | Action metadata: name, inputs, outputs, and `runs` (`node20`, main file `dist/index.js`) |
| `index.js` | Source code. Uses `@actions/core` and `@actions/github` |
| `package.json`, `package-lock.json` | Node.js project and dependencies |
| `dist/index.js` | **Compiled bundle** built with `@vercel/ncc`. This is the file GitHub runs |
| `.gitignore` | Ignores `node_modules/` |

---

## How it was built

```bash
npm init -y
npm install @actions/core@1.11.1 @actions/github@6.0.0
npm install --save-dev @vercel/ncc
npx ncc build index.js -o dist
```

Why `@vercel/ncc`? The action uses npm packages, and they normally live in `node_modules`, which is not committed. `ncc` compiles `index.js` and every package it needs into one file, `dist/index.js`, so the action runs without installing anything.

Why these package versions? The newest `@actions/core` and `@actions/github` are ESM-only. This project uses `require`, so `ncc` failed with them. Versions `1.11.1` and `6.0.0` work with `require`.

### Rebuild after changing the code

```bash
npx ncc build index.js -o dist
git add .
git commit -m "update action"
git push
```

Create a new version tag for each release (for example `v1.0.1`) so workflows can pin an exact version.

---

## Release tag

```bash
git tag -a v1.0.0 -m "version 1.0.0"
git push origin v1.0.0
```
