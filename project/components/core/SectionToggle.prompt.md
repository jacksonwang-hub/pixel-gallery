Segmented control for switching between the two top-level sections. Active segment fills black; the container has a single hairline border.

```jsx
<SectionToggle
  value={view}
  onChange={setView}
  options={[{label:"Curate", value:"curate"}, {label:"Gallery", value:"gallery"}]}
/>
```

Keep to 2–3 short options. For longer option sets use a different navigation pattern.
