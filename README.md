# GitHub Actions Markdown Pages Starter

GitHub Actions를 이용해 Markdown 파일을 HTML로 빌드하고, 테스트한 뒤 GitHub Pages에 배포하는 예제입니다.

## 구조

- `content/*.md`: 원본 Markdown 문서
- `scripts/build.mjs`: Markdown -> HTML 빌드
- `scripts/test.mjs`: 빌드 산출물 검증
- `.github/workflows/ci.yml`: PR/브랜치용 빌드와 테스트
- `.github/workflows/deploy.yml`: main 브랜치 배포

## 빠른 시작

```bash
npm install
npm test
npm run build
```

## GitHub 적용 순서

1. 새 GitHub 저장소를 만듭니다.
2. 이 예제 파일을 커밋해 푸시합니다.
3. 저장소 설정의 **Pages**에서 소스를 **GitHub Actions**로 선택합니다.
4. `main` 브랜치에 푸시하면 자동 배포됩니다.
