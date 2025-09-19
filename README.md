# Using This Repository as a Starting Point

This repo is designed as a **starter / template** for new projects.  
You can create a new repository from it in several ways depending on whether you want to keep history or start fresh.

---

## 🚀 Option 1: Use as a Template (Recommended)
This gives you the code but **not the commit history** — clean for client projects.

1. Make sure this repo is marked as a **Template repository** (Settings → General).
2. Click the green **Use this template** button at the top of the page.
3. Enter a new repository name (e.g. `client-website`).
4. Choose visibility (private/public) and create.
5. Clone the new repo and start working.

---

## 📜 Option 2: Duplicate With History
This keeps **all commit history, branches, and tags**.

```bash
# clone the old repo as a bare repository
git clone --bare https://github.com/YOUR-USER/old-repo.git

# create a new empty repo on GitHub (different name)
# then push everything into it
cd old-repo.git
git push --mirror https://github.com/YOUR-USER/new-repo.git

cd ..
rm -rf old-repo.git
