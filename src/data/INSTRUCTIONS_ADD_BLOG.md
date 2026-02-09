# How to Add New Blog Posts

To add a new article to your Engineering Journal, follow these steps:

1.  **Open the Data File**:
    Navigate to `src/data/blog.json`.

2.  **Add a New Post Object**:
    Inside the `posts` array `[ ... ]`, add a new entry at the top or bottom.

    **Template:**
    ```json
    {
      "id": 9,
      "title": "Your New Blog Post Title",
      "date": "2026-05-20",
      "tag": "BIM",
      "status": "published",
      "readTime": "5 min",
      "summary": "A short description that appears on the card.",
      "content": "The full content of your article.\n\nUse double newlines for paragraph breaks.",
      "url": ""
    }
    ```

3.  **Field Validations**:
    *   `id`: Must be unique.
    *   `date`: Format as `YYYY-MM-DD`.
    *   `tag`: Can be any string (e.g., "Automation", "React", "Thoughts"). New tags automatically create new filter tabs.
    *   `status`: Use `"published"` for live posts, `"draft"` for yellow badge, or anything else for gray.

4.  **Save**:
    Once saved, the website will automatically update to show your new post.
