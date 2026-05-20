# StarOn Labs Company Site

staronlabs.com에 배포하기 위한 스타온랩스 공식 회사 홈페이지입니다. ChartRadar 제품 사이트와 분리된 정적 회사 소개 사이트입니다.

## Pages

- `/` - 회사 소개, 사업자 정보, ChartRadar 제품 소개, 서비스 유의사항
- `/privacy/` - 회원가입·결제·문의폼이 없는 회사 소개 사이트 기준의 개인정보 처리 안내

`/terms/`, `/refund/`는 현재 사이트에서 회원가입과 직접 결제를 제공하지 않으므로 공개 페이지에서 제외했습니다.

## Local Development

```bash
npm run dev
```

기본 주소는 `http://localhost:4173`입니다.

## Build

```bash
npm run build
```

정적 배포 결과물은 `dist/`에 생성됩니다.

## Deployment

GitHub Pages에서 다음 설정을 사용합니다.

- Source: GitHub Actions
- Workflow: `.github/workflows/pages.yml`
- Production domain: `staronlabs.com`
- Custom domain file: `src/CNAME`
- Canonical URL: `https://staronlabs.com`

도메인 DNS에는 GitHub Pages가 안내하는 레코드를 추가합니다.

```txt
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  <GitHub 사용자명>.github.io
```

## Business Info

- 상호: 스타온랩스 / StarOn Labs
- 대표자: 송바울
- 사업자등록번호: 705-06-03540
- 사업장 주소: 인천광역시 연수구 독배로35
- 고객센터: support@staronlabs.com
- 이메일: contact@staronlabs.com

## Assets

사용자가 제공한 로고 이미지에서 심볼을 잘라 다음 자산을 생성했습니다.

- `src/assets/staron-symbol.png`
- `src/assets/favicon.png`
- `src/assets/favicon-192.png`
- `src/assets/apple-touch-icon.png`
- `src/assets/og-image.png`
