# Decisions

## 1. Astro + MDX를 v1 스택으로 쓴다

Astro는 Markdown/MDX 글, content schema 검증, 정적 빌드, RSS/sitemap, 컴포넌트 확장이 블로그 목적에 잘 맞는다. Jekyll은 단순 GitHub Pages 블로그에는 좋지만 Ruby/Liquid 기반이고, MDX와 타입 검증 중심 구조에는 약하다. Next.js는 풀스택 학습에는 좋지만 v1 블로그에는 과하다.

## 2. 글 원본은 repo MDX다

글은 `src/content` 아래 MDX 파일이 원본이다. DB, CMS, Tistory를 글의 source of truth로 쓰지 않는다. 이 선택은 Git diff, 리뷰, 백업, AI 탐색, 이식성을 우선하기 때문이다.

## 3. v1에서는 DB를 쓰지 않는다

DB 학습 욕구만으로 블로그 v1에 DB를 넣으면 글쓰기보다 인증, API, 마이그레이션, 운영 문제가 커진다. 나중에 DB를 붙인다면 글 원본이 아니라 조회수, 방문 로그, 읽기 기록 같은 부속 기능부터 검토한다.

## 4. v1에서는 댓글을 쓰지 않는다

초기 기술블로그에서 댓글은 핵심 가치가 아니다. 스팸, 승인, 삭제, 신고, 개인정보 같은 운영 부담이 생긴다. 필요가 생기면 v1.5에서 GitHub Discussions 기반 giscus를 selected posts에만 붙이는 방식을 검토한다.

## 5. 한영 혼합은 단일 피드로 운영한다

`/ko`, `/en` prefix 없이 같은 목록에 한국어/영어 글을 섞고, 글마다 `lang` 배지를 표시한다. URL은 영어 kebab-case로 유지한다.
