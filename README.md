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
