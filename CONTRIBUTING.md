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
    VITE_REDUX_PERSIST_SECRET_KEY= "831476e3ea64e7868101b191c65eebddbe123408"
    ```

- Start the development server:

```bash
npm run dev
```

- To watch for changes in CSS files and automatically rebuild Tailwind CSS, run:
  
```bash
npm run watch-css
```

- To check build conflicts run:
  
```
npm run build
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

### Alternatively, contribute using GitHub Desktop

1. **Open GitHub Desktop:**
   Launch GitHub Desktop and log in to your GitHub account if you haven't already.

2. **Clone the Repository:**
   - If you haven't cloned the popShop repository yet, you can do so by clicking on the "File" menu and selecting "Clone Repository."
   - Choose the popShop repository from the list of repositories on GitHub and clone it to your local machine.

3. **Switch to the Correct Branch:**
   - Ensure you are on the branch that you want to submit a pull request for.
   - If you need to switch branches, you can do so by clicking on the "Current Branch" dropdown menu and selecting the desired branch.

4. **Make Changes:**
   Make your changes to the code or files in the repository using your preferred code editor.

5. **Commit Changes:**
   - In GitHub Desktop, you'll see a list of the files you've changed. Check the box next to each file you want to include in the commit.
   - Enter a summary and description for your changes in the "Summary" and "Description" fields, respectively. Click the "Commit to <branch-name>" button to commit your changes to the local branch.

6. **Push Changes to GitHub:**
   After committing your changes, click the "Push origin" button in the top right corner of GitHub Desktop to push your changes to your forked repository on GitHub.

7. **Create a Pull Request:**
  - Go to the GitHub website and navigate to your fork of the popShop repository.
  - You should see a button to "Compare & pull request" between your fork and the original repository. Click on it.

8. **Review and Submit:**
   - On the pull request page, review your changes and add any additional information, such as a title and description, that you want to include with your pull request.
   - Once you're satisfied, click the "Create pull request" button to submit your pull request.

9. **Wait for Review:**
    Your pull request will now be available for review by the project maintainers. They may provide feedback or ask for changes before merging your pull request into the main branch of the popShop repository.

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
