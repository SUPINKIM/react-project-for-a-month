# react-project-for-a-month

### WEEK 1

#### 📚 DAY1-2

**TODO LIST**

- [x] Vite로 프로젝트를 초기화하고, 필요한 패키지를 설치하세요.

- [x] Babel 설정 파일을 작성하고, Babel 플러그인을 설치하세요.

- [x] 간단한 JSX 파일을 작성하고, 트랜스파일된 결과를 확인하세요.

- [ ] JSX가 어떻게 createElement 함수로 변환되는지 이해하세요.

---

- React.createElement `index.d.ts`

```js
    // DOM Elements
    // TODO: generalize this to everything in `keyof ReactHTML`, not just "input"
    function createElement(
        type: "input",
        props?: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | null,
        ...children: ReactNode[]
    ): DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
        type: keyof ReactHTML,
        props?: ClassAttributes<T> & P | null,
        ...children: ReactNode[]
    ): DetailedReactHTMLElement<P, T>;
    function createElement<P extends SVGAttributes<T>, T extends SVGElement>(
        type: keyof ReactSVG,
        props?: ClassAttributes<T> & P | null,
        ...children: ReactNode[]
    ): ReactSVGElement;
    function createElement<P extends DOMAttributes<T>, T extends Element>(
        type: string,
        props?: ClassAttributes<T> & P | null,
        ...children: ReactNode[]
    ): DOMElement<P, T>;

    // Custom components

    function createElement<P extends {}>(
        type: FunctionComponent<P>,
        props?: Attributes & P | null,
        ...children: ReactNode[]
    ): FunctionComponentElement<P>;
    function createElement<P extends {}, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
        type: ClassType<P, T, C>,
        props?: ClassAttributes<T> & P | null,
        ...children: ReactNode[]
    ): CElement<P, T>;
    function createElement<P extends {}>(
        type: FunctionComponent<P> | ComponentClass<P> | string,
        props?: Attributes & P | null,
        ...children: ReactNode[]
    ): ReactElement<P>;
```

#### 📚 DAY3-4

**TODO LIST**

- [x] createElement 함수를 작성하세요.

- [ ] 간단한 JSX를 작성하고, 트랜스파일된 결과를 확인하세요.

- [ ] createElement 함수가 제대로 동작하는지 테스트하세요.

- [ ] 생성된 Virtual DOM 객체를 콘솔로 출력하고, 구조를 분석하세요.

---

[React - createElement 알아보기
](https://velog.io/@sa02045/React-createElement-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)

- createElement는 React Element를 생성
- React Element는 DOM을 생성하기 위한 HTML Element와 비슷
- React Element 자체로는 DOM 요소를 생성하지 않습니다.

##### createElement가 legacy API가 된 이유

- 불필요하게 React를 import함 (JSX 문법을 쓰면 React 객체를 import 해올 필요가 없음에도 불구하고 React.createElement로 변환되면 React를 못 찾기 때문에 명시적 import가 필요했음.)
- 클래스 컴포넌트를 사용했을 때 createElement가 의미 있었지만 함수형 컴포넌트 등장으로 의미를 잃어버렸음
- key를 props로 전달하는 방식은 성능 이슈를 일으킴([그 많던 import React from ‘react’는 어디로 갔을까](https://so-so.dev/react/import-react-from-react/))

```js
function Title() {
  return <h1 className="title">Hello!</h1>;
}

// 변환
// 트랜스파일러에 의해 자동으로 import { jsx as _jsx } from "react/jsx-runtime" 가 추가
import { jsx as _jsx } from 'react/jsx-runtime';

function Title() {
  return _jsx('h1', {
    className: 'title',
    children: ' Hello!',
  });
}
```
