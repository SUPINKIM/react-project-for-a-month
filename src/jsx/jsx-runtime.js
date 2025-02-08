import { createElement } from '@/utils/createElement';

export const h = (component, props, ...children) =>
  createElement(component, props, children);

export const Fragment = 'Fragment';
