# Contribution Rules📚:

- You are allowed to make multiple pull requests in one time. We'll merge surely merge the perfect ones :)
- Do NOT remove other content.
- Styling/code can be pretty, ugly or stupid, big or small as long as it works 😉
- Make sure your create a separate branch before opening a PR.
- Try to keep pull requests small to minimize merge conflicts.

## Getting Started 🤩🤗:

- Fork the repository
- Clone your forked repository:

```bash
git clone https://github.com/<your-github-username>/popShop.git
```

- Navigate to the project directory:

```bash
cd popShop
```

- Install dependencies:

```bash
npm install
```

- Setup Environment Variables
  - Create a file `.env.local` in the root directory.
  - Add the following in the `.env.local` file.
  - ```bash
    VITE_PROJECT_KEY="https://drnetvgmyxknfbeftdhy.supabase.co"
    VITE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybmV0dmdteXhrbmZiZWZ0ZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwOTM5OTcsImV4cCI6MjAyNTY2OTk5N30.5oi3T2rvQLdc5hBB-dY_EYEHlQ4VlVWplAGHQn_bir4"
    ```

- Start the development server:

```bash
npm run dev
```

- Create a new branch for your contribution:

```bash
git checkout -b your-username/feature-name
```

- Make your changes and commit them with a valid commit message :

```bash
git commit -m "Added a transition"
```

- Push your changes to your fork:

```bash
git push origin your-username/feature-name
```

- Raise a Pull Request to the **dev** branch!
- **Get your PR merged 🚀**

<br>

## Avoid Conflicts {Syncing your fork}

An easy way to avoid conflicts is to add an 'upstream' for your git repo, as other PR's may be merged while you're working on your branch/fork.

```bash
git remote add upstream https://github.com/pooranjoyb/BeatBridge
```

You can verify that the new remote has been added by typing

```bash
git remote -v
```

To pull any new changes from your parent repository simply run

```bash
git merge upstream/master
```

This will give you any eventual conflicts and allow you to easily solve them in your repo. It's a good idea to use it frequently in between your own commits to make sure that your repo is up to date with its parent.
