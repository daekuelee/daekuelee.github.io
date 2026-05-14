# Writing Guide

## Entry Types

- `posts`: 완성도 있는 공개 기술글
- `notes`: 학습노트, 실험 기록, 덜 정제된 지식
- `projects`: 개발자 쇼케이스용 프로젝트 페이지

## Frontmatter

```yaml
---
title: "Post title"
description: "One or two sentences for cards, SEO, and RSS."
pubDate: 2026-05-14
updatedDate: 2026-05-14
lang: ko
tags: ["astro", "mdx"]
draft: true
featured: false
series: "blog-system"
---
```

## Rules

- Slugs use English kebab-case and should not change after publishing.
- `description` must describe the actual article, not tease it.
- Use `draft: true` until the post is ready for public lists, RSS, and search.
- Prefer small focused posts over long mixed-topic posts.
- Use `notes` for rough learning material instead of lowering the quality bar for `posts`.
