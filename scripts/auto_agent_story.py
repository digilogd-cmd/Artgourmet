# -*- coding: utf-8 -*-
"""
Art Gourmet Agent Story Auto-Publisher Script
Author: Chulsu (Lead Developer)
"""
import os
import sys
import json
import argparse
import datetime
import subprocess

# 윈도우 환경에서 이모지 출력으로 인한 UnicodeEncodeError 방지
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def run_git_command(args, cwd):
    try:
        result = subprocess.run(args, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, f"Command failed: {e.stderr}"

def main():
    parser = argparse.ArgumentParser(description="Add a new Agent Story to posts.json and push to GitHub.")
    parser.add_argument("--title", required=True, help="Title of the story")
    parser.add_argument("--author", required=True, help="Author of the story")
    parser.add_argument("--role", required=True, help="Role of the author")
    parser.add_argument("--content", required=True, help="Main content/body of the story")
    parser.add_argument("--date", help="Date in YYYY-MM-DD format (defaults to today)")

    args = parser.parse_args()

    # Project directories
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    posts_json_path = os.path.join(project_root, "data", "posts.json")

    if not os.path.exists(posts_json_path):
        print(f"[Error] posts.json not found at: {posts_json_path}")
        sys.exit(1)

    # Date check
    post_date = args.date if args.date else datetime.date.today().strftime("%Y-%m-%d")

    # Load existing posts
    with open(posts_json_path, "r", encoding="utf-8") as f:
        try:
            posts = json.load(f)
        except Exception as e:
            print(f"[Error] Failed to parse posts.json: {str(e)}")
            sys.exit(1)

    # Determine new ID
    max_id = 0
    for p in posts:
        if isinstance(p.get("id"), int) and p["id"] > max_id:
            max_id = p["id"]
    new_id = max_id + 1

    # Create new post object
    new_post = {
        "id": new_id,
        "title": args.title,
        "author": args.author,
        "role": args.role,
        "date": post_date,
        "content": args.content
    }

    # Prepend new post
    posts.insert(0, new_post)

    # Save posts.json
    with open(posts_json_path, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f"[Success] Added Episode {new_id} to posts.json!")
    print(f" - Title: {args.title}")
    print(f" - Author: {args.author} ({args.role})")
    print(f" - Date: {post_date}")

    # Git Operations
    print("[Git] Staging posts.json...")
    success, out = run_git_command(["git", "add", "data/posts.json"], project_root)
    if not success:
        print(f"[Git Error] Failed to git add: {out}")
        sys.exit(1)

    commit_msg = f"feat: add Episode {new_id} Agent Story"
    print(f"[Git] Committing: '{commit_msg}'...")
    success, out = run_git_command(["git", "commit", "-m", commit_msg], project_root)
    if not success:
        print(f"[Git Error] Failed to git commit: {out}")
        sys.exit(1)

    print("[Git] Pushing to GitHub (origin main)...")
    success, out = run_git_command(["git", "push", "origin", "main"], project_root)
    if not success:
        print(f"[Git Error] Failed to git push: {out}")
        sys.exit(1)

    print("[Success] Git commit & push completed successfully!")
    print("ArtGourmet homepage will be automatically redeployed via Firebase CDN cache purge.")

if __name__ == "__main__":
    main()
