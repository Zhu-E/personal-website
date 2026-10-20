# Personal website

A static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8765
```

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Homepage: the Endless Waves banner, the intro, featured projects and featured blog posts |
| `projects.html` | Every project, with details |
| `blog.html` | Every blog post |
| `blog/_template.html` | Starting point for a new post (not linked from anywhere) |
| `art/waves.html` | Copy of Endless Waves, adapted to run as the homepage banner |
| `404.html` | Not-found page, for hosts that serve one |

The header and footer are repeated in each page, so a change to the nav or footer needs to be made in all of them.

## Adding a blog post

1. Copy `blog/_template.html` to `blog/your-post.html`. Change the `<title>`, the `<h1>`, the date and the body.
2. In `blog.html`, replace the `<p class="empty">` line with a `<ul class="cards">` list (newest first), one `<li class="card">` per post. The exact markup is in a comment in `blog.html`.
3. To feature it on the homepage, add the same `<li class="card">` to the blog column in `index.html`, again replacing its `<p class="empty">` line. Links there are `blog/your-post.html`.

## Featuring a project

Each project on `projects.html` has an `id`, like `id="typst-local"`. A featured card on the homepage links to `projects.html#typst-local`, which scrolls to that project and opens its details. To feature a different project, edit the cards in the "Featured projects" column of `index.html`.
