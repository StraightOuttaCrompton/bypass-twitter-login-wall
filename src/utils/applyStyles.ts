export default function applyStyles(element: ElementCSSInlineStyle | null, styles: Partial<CSSStyleDeclaration>) {
    if (!element) return;

    for (const [key, value] of Object.entries(styles)) {
        // @ts-ignore
        element.style[key] = value;
    }
}
