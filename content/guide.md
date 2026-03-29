---
title: 배포 가이드
description: 저장소에 적용하는 순서
---

# 배포 가이드

## 로컬 실행

```bash
npm install
npm test
npm run build
```

## GitHub 저장소 설정

- 기본 브랜치를 `main`으로 사용합니다.
- Actions 권한은 기본값이면 충분합니다.
- Pages 소스는 **GitHub Actions**를 선택합니다.

## 확인 포인트

- Pull Request에서는 테스트와 빌드만 수행됩니다.
- `main` 브랜치 푸시에서는 Pages 배포까지 이어집니다.
