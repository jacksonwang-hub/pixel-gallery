The hung-artwork frame: 1.5px black keyline, generous white mat, 1px inner keyline. The defining object of the system — pixel photos sit inside it.

```jsx
<ArtFrame size={256} ar={photo.width / photo.height} mat={22}>
  <img src={photo.src} style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"pixelated"}} />
</ArtFrame>
```

`size` is the well's longest edge; pass `ar` to match the photo's aspect ratio (omit for square). Pair with `<Plaque>` below it. Use a bigger `size` for the zoom/lightbox view (e.g. 520) and a wider `mat`.
