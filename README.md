# CodeFlow-Review

이 Chrome 확장 프로그램은 개발자들이 ChatGPT를 활용하여 자동으로 코드 리뷰를 받을 수 있도록 도와주는 도구입니다. JavaScript 코드를 입력하면 여러 측면에서 코드를 분석하고 개선점을 제안합니다.

## 주요 기능

- **자동 코드 리뷰**: 입력된 코드를 ChatGPT에 전달하여 자동으로 리뷰를 진행합니다.
- **단계별 코드 분석**: 다음과 같은 측면에서 코드를 분석합니다:
  1. 주석의 적절성 평가 및 개선
  2. 순수 컴포넌트 원칙 준수 여부 확인
  3. 그 외 코드 개선점 제안
  4. 분석 내용 요약 (Markdown 형식)
- **코드 리팩토링**: 각 분석 단계마다 리팩토링된 코드를 제공합니다.
- **질문 관리 UI**: 코드 리뷰 질문 목록을 관리할 수 있는 사용자 인터페이스 제공

## 사용 방법

1. Chrome 확장 프로그램을 설치합니다.
2. 확장 프로그램 아이콘을 클릭하여 팝업을 엽니다.
3. 리뷰받을 JavaScript 코드를 입력창에 붙여넣습니다.
4. "코드 리뷰 시작" 버튼을 클릭합니다.
5. 자동으로 ChatGPT 페이지에서 코드 리뷰가 진행됩니다.
6. 리뷰 완료 후 알림을 받습니다.

## 주의사항

- 이 확장 프로그램을 사용하기 위해서는 ChatGPT 페이지가 열려 있어야 합니다.
- ChatGPT의 UI가 변경될 경우 확장 프로그램이 정상적으로 작동하지 않을 수 있습니다.
- 코드 리뷰 과정은 연속적인 질문을 ChatGPT에 전송하므로 ChatGPT의 사용량 제한에 영향을 받을 수 있습니다.
- 현재는 JavaScript 코드만 지원합니다.

## 설치 방법

1. 이 저장소를 클론합니다.
   ```
   git clone https://github.com/yourusername/CodeFlow-Review.git
   ```
2. 의존성 패키지를 설치합니다.
   ```
   pnpm install
   ```
3. 개발 빌드를 실행합니다.
   ```
   pnpm dev
   ```
4. Chrome 브라우저에서 `chrome://extensions/`로 이동합니다.
5. 개발자 모드를 활성화합니다.
6. "압축해제된 확장 프로그램을 로드합니다" 버튼을 클릭합니다.
7. `chrome-mv3-dev` 폴더를 선택합니다.

## 기술 스택

- TypeScript
- React
- SCSS (스타일링)
- WXT (Web Extension Tools)
- Chrome Extensions API
- PNPM (패키지 관리자)

## 프로젝트 구조

```
.
├── README.md
├── assets                   # 프로젝트 에셋 폴더
├── entrypoints
│   ├── background.ts        # 백그라운드 스크립트
│   ├── content.ts           # 콘텐츠 스크립트
│   └── popup                # 팝업 UI 컴포넌트
│       ├── App.tsx          # 메인 React 컴포넌트
│       ├── App.scss         # 메인 컴포넌트 스타일
│       ├── QuestionsList.tsx # 질문 목록 컴포넌트
│       ├── QuestionsList.scss # 질문 목록 스타일
│       ├── components/      # 재사용 가능한 UI 컴포넌트
│       ├── chatGptService.ts # ChatGPT 연동 서비스
│       ├── constants.ts     # 상수 정의
│       ├── domHelpers.ts    # DOM 관련 유틸리티 함수
│       ├── index.html       # 팝업 HTML 템플릿
│       ├── injected.ts      # 페이지에 주입되는 스크립트
│       ├── main.tsx         # React 진입점
│       └── questions.ts     # 코드 리뷰 질문 모듈
├── public                   # 정적 리소스
│   ├── icon                 # 확장 프로그램 아이콘 (다양한 크기)
│   │   ├── 128.png
│   │   ├── 16.png
│   │   ├── 32.png
│   │   ├── 48.png
│   │   └── 96.png
│   └── wxt.svg              # WXT 로고
└── wxt.config.ts            # WXT 설정 파일
```

## 개발 가이드

### 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 모드 실행
pnpm dev

# 빌드
pnpm build
```

### 컴포넌트 구조

- `App.tsx`: 메인 애플리케이션 컴포넌트
- `QuestionsList.tsx`: 코드 리뷰 질문 목록을 관리하는 컴포넌트
- `components/`: 재사용 가능한 UI 컴포넌트들이 위치한 디렉토리

### 코드 리뷰 질문 수정

`entrypoints/popup/questions.ts` 파일에서 코드 리뷰 질문을 수정할 수 있습니다.

### 아이콘 변경

`public/icon` 디렉토리의 이미지 파일들을 교체하여 확장 프로그램의 아이콘을 변경할 수 있습니다. 다양한 해상도(16x16, 32x32, 48x48, 96x96, 128x128)의 PNG 이미지를 준비해야 합니다.

## 버전 관리

버전 변경 정보는 프로젝트 루트의 `CHANGELOG.md` 파일에서 확인할 수 있습니다.

## 향후 개선 계획

- 다른 프로그래밍 언어 지원 추가
- 사용자 정의 질문 템플릿 추가
- 리뷰 내용을 로컬에 저장하는 기능
- 코드 분석 결과 내보내기 기능
- 리뷰 히스토리 관리

## 라이선스

MIT

## 기여하기

이슈와 PR은 언제나 환영합니다. 코드 개선이나 새로운 기능 제안은 이슈를 통해 먼저 논의해주세요.
