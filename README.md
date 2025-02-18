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

- [x] 간단한 JSX를 작성하고, 트랜스파일된 결과를 확인하세요.

- [x] createElement 함수가 제대로 동작하는지 테스트하세요.

- [x] 생성된 Virtual DOM 객체를 콘솔로 출력하고, 구조를 분석하세요.

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

---

##### 새롭게 알게 된 사실 (25.02.07)

1. `@babel/preset-react` 를 설치하지 않고 단순히 `@babel/plugin-transform-react-jsx` 만을 의존성에 추가하고 트랜스파일링 했을 시 결과는 React.createElement로 변환된다. (legacy)

```js
{
  "presets": [],
  "plugins": ["@babel/plugin-transform-react-jsx"]
}
```

2. `@babel/preset-react` 를 설치하고 babel.config.json > presets 에 추가한 뒤 {"runtime": "automatic"} (default : "classic") 옵션을 주면 jsx 함수로 트랜스 파일링이 됨. (단, `react/jsx-runtime` 모듈이 빌드 시에 babel에 의해 자동으로 import 되는데 react-dom이 안 깔려 있으면 해당 모듈을 찾지 못해서 빌드가 실패한다.)

```js
l = h();
const m = () => {
  const i = () => {
    alert('Hello world');
  };
  return l.jsxs('button', {
    onClick: i,
    children: [
      l.jsx('span', { className: 'button-name', children: 'this is button!' }),
      l.jsx('div', {
        children: l.jsx('span', { children: 'this is children~' }),
      }),
    ],
  });
};
```

---

#### [vite jsx 빌드 옵션 공식문서](https://ko.vitejs.dev/guide/features#jsx)

- ##### JSX
  - `.jsx`와 `.tsx` esbuild를 이용해 컴파일링합니다.
  - React나 Vue를 사용하지 않는다 해도, esbuild 옵션을 이용해 `jsxFactory`나 `jsxFragment`를 커스터마이징 할 수 있습니다.
  - 참고로 Vite에서만 제공되는 옵션인 jsxInject를 이용해 JSX에 대한 헬퍼를 사용할 수도 있습니다.

[esbuild jsx 공식문서](https://esbuild.github.io/content-types/#jsx)

- Using JSX without React

  - if you're using JSX with a library other than React (such as Preact), you'll likely need to configure the JSX factory and JSX fragment settings since they default to React.createElement and React.Fragment respectively

- You will also have to add import {h, Fragment} from 'preact' in files containing JSX syntax unless you use auto-importing as described above.

---

#### 📚 DAY5

**TODO LIST**

- [x] 최소 2개의 자식 컴포넌트를 가진 App 컴포넌트를 작성하세요.

- [ ] 컴포넌트에서 다양한 HTML 요소와 속성을 사용해보세요.

- [x] 생성된 Virtual DOM 객체를 콘솔로 출력하고, 구조를 분석하세요.

---

### WEEK 2

#### 📚 DAY1-2

**TODO LIST**

- [x] render 함수를 작성하여 Virtual DOM을 실제 DOM으로 변환하세요.

- [x] 간단한 Virtual DOM 객체를 만들어 render 함수를 테스트하세요.

- [x] 생성된 DOM이 예상대로 화면에 표시되는지 확인하세요.

---

##### 새롭게 알게 된 사실 (25.02.12)

React 18버전부터 이전에 사용하던 render 함수가 deprecated, `createRoot` 함수로 대체되었습니다.

[render 함수(React 공식문서)](https://18.react.dev/reference/react-dom/render)

---

##### TroubleShooting (25.02.12)

```
render 함수를 만들면서 이전에 만든 createElement 함수의 버그를 발견했습니다. children 으로 넘겨준 JSX 가 VDOM을 만들면서 소실되는 지점을 발견했습니다. 이를 해결하기 위해서 'Component' 라는 임의의 type을 주입하던 부분을 제거하고 createElement 함수의 type이 function이면 바로 type 함수를 호출해서 JSX를 파싱할 수 있게 했습니다.

여기서 주의할 점은 type 함수를 호출할 때 children을 같이 넘기지 않으면 children props의 올바른 위치에 제대로 렌더링이 안 되는 문제가 있기 때문에 children을 같이 넘겨주도록 수정했습니다.
```

```js
// 아래와 같이 children을 넘기면
const result = type(props);
return {
  ...result,
  children: [...result.children, ...children],
};

/**
 * ⛔️ 이렇게 렌더링 한 경우에도 124가 먼저 dom에 그려지고 그 다음 children이 렌더링 될 것이므로 의도한대로 children이 렌더링 되지 않는 문제가 발생!
 */
<div>
  {children}
  <div>124</div>
</div>;
```

---

#### 📚 DAY3-4

**TODO LIST**

- [x] useState 함수를 구현하세요.

- [x] 간단한 카운터 컴포넌트를 만들어 상태 변경에 따른 UI 변화를 확인하세요.

- [x] 상태 변경 시 어떻게 컴포넌트가 재렌더링되는지 이해하세요.

---

##### [React에서 `key`를 사용하는 이유](https://www.moonkorea.dev/React-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%9E%AC%EC%A1%B0%EC%A0%95%EA%B3%BC-key)

- 자식 요소에 고유한 key를 부여하면 재조정 과정을 효율적으로 수행할 수 있습니다.

* 재조정 과정은 이전 가상 DOM과 새로운 가상 DOM을 비교해서 변경된 부분을 실제 DOM에 업데이트 하는 과정.
* 위와 같이 종속 트리를 유지하지 않고 변경 사항이라고 판단되는 패턴이 앱 전반적으로 반복되면 성능상 비효율적입니다. 우리는 리액트에 새로운 가상 DOM 트리에서 DOM 노드가 변하지 않았다는 것을 알려줄 수 있습니다.

##### 재조정과 key

- 리액트는 배열을 순회하며 동적으로 리스트의 요소들을 생성하면 다음 렌더에서 이전 리스트가 어떻게 바뀔지 알지 못합니다. 요소의 순서가 바뀔 여지도 존재하고, 리스트에서 추가 또는 제거될 수도 있습니다. 우리는 자식 요소에 key라는 고유한 값을 제공함으로써 리액트에게 재조정 과정에서 효율적으로 요소들을 비교하고 정말 변한 부분만 실제 DOM에 반영할 수 있습니다.

- 이제 자식 요소의 순서가 바뀌더라도 **렌더 간 요소를 재사용합니다.** 이전 렌더에서 특정 타입과 key 값을 갖는 요소의 경우 **다음 렌더에서도 동일한 타입과 key를 갖는다면 재조정 과정에서 리액트는 비교 작업을 수행할 때 동일한 요소가 사용된다는 것을 알 수 있기 때문에 더 적은 비용으로 최소한의 변경만 실제 DOM에 반영하고 연산 작업을 수행하는 것입니다.** 우리는 key를 통해 리액트에게 각 요소가 변할 때 어떻게 처리해야 할지에 대한 정보를 제공할 수 있습니다.

```js
const items = ['apple', 'banana', 'orange'];

items.map((fruit, index) => <li key={index}>{fruit}</li>);

const items = ['mango', 'apple', 'banana', 'orange'];
```

최초 items 배열이 렌더링 될 때 apple의 key는 0, banana는 1, orange는 2의 key 값을 가지게 됩니다. 하지만 mango를 첫 요소로 추가하면 key 값은 0부터 mango에 할당되고 전부 바뀌게 됩니다.

key가 바뀌게 되면 이전 글에서 닫룬 재조정에서 "요소의 타입이 다른 경우"와 동일하게 리액트는 해당 요소를 새로운 요소로 간주하고 실제 DOM에 업데이트를 진행합니다.

**상태를 갖는 경우 index를 key 값으로 사용하면 어떻게 될까요?**

고유한 id를 key로 사용한 경우, 리액트는 해당 key가 같은 요소를 가리킨다고 판단합니다. 즉, key 값이 고유하기 때문에 배열의 순서와 무관하게 같은 DOM 요소라고 판단합니다. 따라서 요소가 갖는 체크 박스 상태가 유지됩니다.

반면, 인덱스를 Key로 사용할 때 배열의 순서가 변경되면 기존 key값은 새로운 인덱스 값을 갖게 됩니다. 렌더 간 key는 모두 변경되기 때문에 리액트는 자식 요소들을 새로운 요소로 판단합니다. 따라서 체크박스의 상태는 유지되지 않고 초기화됩니다.

---

#### 📚 DAY5

**TODO LIST**

- [x] 간단한 TODO 리스트 앱을 만들어 보세요.

  - [x] 할 일 추가, 완료 처리 등을 구현합니다.

- [x] 이벤트를 통해 상태를 변경하고, UI가 업데이트되는 과정을 경험하세요.

- [ ] 전체적인 동작 흐름을 정리해 보세요.

---

### WEEK 3

#### 📚 DAY1-2

**TODO LIST**

- [ ] 이전에 만든 `render` 함수를 개선하여 `diff` 알고리즘을 추가하세요.

- [ ] 상태 변경 시 새로운 Virtual DOM을 생성하고, 이전 Virtual DOM과 비교하여 변경된 부분만 업데이트하세요.

- [ ] 간단한 예제를 통해 DOM 업데이트가 효율적으로 이루어지는지 확인하세요.
