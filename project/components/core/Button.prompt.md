Uppercase, letter-spaced action button — black fill for primary actions, hairline ghost otherwise. Use for "Ship it", "Enter the gallery", and any commit action.

```jsx
<Button variant="primary" arrow onClick={ship}>Ship it</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants: `primary` (black/white) and `ghost` (white with 1px border). Sizes `sm | md | lg`. `arrow` adds a trailing solid triangle; `disabled` greys it to the fill token.
