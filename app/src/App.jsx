import { useState, useEffect, useRef, useCallback } from 'react'

// ── constants ─────────────────────────────────────────────────
const MAXWELL = 300   // longest side of the image well in px
const WELL_PAD = 50   // 22px mat + 3px keyline, each side → (22+3)*2
const FLOOR_H = 304   // floor strip height (raised 200px from original 104px)
const SLOT_W = 420    // each gallery slot width

const TONE = {
  wall:  '#ffffff',
  floor: '#efeeea',
  base:  '#e0ded8',
}

// ── helpers ───────────────────────────────────────────────────

function pixelate(src, size) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const ar = img.width / img.height
      let w, h
      if (ar >= 1) { w = size; h = Math.max(1, Math.round(size / ar)) }
      else          { h = size; w = Math.max(1, Math.round(size * ar)) }
      const canvas = document.createElement('canvas')
      canvas.width = w; canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, 0, 0, w, h)
      resolve({ px: canvas.toDataURL(), ar: img.width / img.height })
    }
    img.onerror = () => resolve({ px: src, ar: 1 })
    img.src = src
  })
}

function frameDims(ar) {
  const a = ar && ar > 0 ? ar : 1
  let wellW, wellH
  if (a >= 1) { wellW = MAXWELL; wellH = Math.round(MAXWELL / a) }
  else         { wellH = MAXWELL; wellW = Math.round(MAXWELL * a) }
  return { fw: wellW + WELL_PAD, fh: wellH + WELL_PAD }
}

function pad2(n) { return String(n).padStart(2, '0') }

// ── cover image element ────────────────────────────────────────
function CoverImg({ src }) {
  return (
    <img
      src={src}
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated', display: 'block' }}
    />
  )
}

// ── keycap element ─────────────────────────────────────────────
function KeyCap({ children }) {
  return (
    <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #d6d6d6', borderRadius: 4 }}>
      {children}
    </div>
  )
}

// arrows as CSS triangles
const ArrowLeft  = () => <div style={{ width:0,height:0,borderTop:'6px solid transparent',borderBottom:'6px solid transparent',borderRight:'9px solid #111' }} />
const ArrowRight = () => <div style={{ width:0,height:0,borderTop:'6px solid transparent',borderBottom:'6px solid transparent',borderLeft:'9px solid #111' }} />
const ArrowUp    = () => <div style={{ width:0,height:0,borderLeft:'6px solid transparent',borderRight:'6px solid transparent',borderBottom:'9px solid #111' }} />
const ArrowDown  = () => <div style={{ width:0,height:0,borderLeft:'6px solid transparent',borderRight:'6px solid transparent',borderTop:'9px solid #111' }} />
const ArrowDownSm= () => <div style={{ width:0,height:0,borderLeft:'5px solid transparent',borderRight:'5px solid transparent',borderTop:'8px solid #111' }} />

// ── App ───────────────────────────────────────────────────────
export default function App() {
  // view state
  const [view, setView] = useState('curate')  // 'curate' | 'gallery'

  // curate state
  const [images, setImages]           = useState([])  // {id, px, ar}
  const [phase, setPhase]             = useState('select')  // 'select'|'shipping'|'delivered'
  const [shippedCount, setShippedCount] = useState(0)
  const [truckGone, setTruckGone]     = useState(false)

  // gallery state
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [zoomed, setZoomed]           = useState(false)
  const [dir, setDir]                 = useState(1)   // 1=right, -1=left
  const [walkerH, setWalkerH]         = useState(150)

  const timersRef = useRef([])

  // stable ref for keyboard handler to avoid stale closures
  const stateRef = useRef({})
  stateRef.current = { view, galleryIndex, zoomed, images }

  // ── measure walker height ────────────────────────────────────
  const measure = useCallback(() => {
    const frames = [...document.querySelectorAll('[data-frame]')]
    if (!frames.length) return
    let maxB = 0
    frames.forEach(f => { const b = f.getBoundingClientRect().bottom; if (b > maxB) maxB = b })
    const H = window.innerHeight
    const gap = (H - maxB) - FLOOR_H
    if (gap < 40) return
    const h = Math.round(gap / 2)
    setWalkerH(prev => Math.abs(h - prev) > 1 ? h : prev)
  }, [])

  // ── keyboard navigation (registered once) ───────────────────
  useEffect(() => {
    const onKey = (e) => {
      const { view, galleryIndex, zoomed, images } = stateRef.current
      if (view !== 'gallery') return
      const maxIdx = (images.length || 3)   // 3 placeholder slots when empty

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (zoomed) return
        setDir(1)
        setGalleryIndex(prev => Math.min(prev + 1, maxIdx))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (zoomed) return
        setDir(-1)
        setGalleryIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (galleryIndex >= 1 && images.length) setZoomed(true)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setZoomed(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // ── resize handler ───────────────────────────────────────────
  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  // ── measure after switching to gallery ───────────────────────
  useEffect(() => {
    if (view === 'gallery') requestAnimationFrame(() => measure())
  }, [view, measure])

  // ── cleanup timers on unmount ────────────────────────────────
  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  // ── file upload handler ──────────────────────────────────────
  function handleFiles(files) {
    const room = 10 - images.length
    Array.from(files).slice(0, room).forEach(f => {
      const reader = new FileReader()
      reader.onload = async () => {
        const { px, ar } = await pixelate(reader.result, 64)
        setImages(prev => [...prev, { id: Date.now() + Math.random(), px, ar: ar || 1 }])
      }
      reader.readAsDataURL(f)
    })
  }

  function removeImage(id) {
    setImages(prev => prev.filter(i => i.id !== id))
  }

  // ── ship animation ───────────────────────────────────────────
  function ship() {
    if (!images.length) return
    setPhase('shipping')
    setShippedCount(0)
    setTruckGone(false)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    const n = images.length
    for (let i = 1; i <= n; i++) {
      timersRef.current.push(setTimeout(() => setShippedCount(i), 520 * i))
    }
    timersRef.current.push(setTimeout(() => setTruckGone(true), 520 * n + 700))
    timersRef.current.push(setTimeout(() => setPhase('delivered'), 520 * n + 2300))
  }

  function goGallery() {
    setView('gallery')
    setGalleryIndex(0)
    setZoomed(false)
  }

  // ── derived values ───────────────────────────────────────────
  const has = images.length > 0
  const n = images.length
  const imgList = has ? images : [null, null, null]
  const shipPct = n ? Math.round(Math.min(shippedCount, n) / n * 100) + '%' : '0%'

  // zoom frame dimensions
  const zImg = galleryIndex >= 1 ? images[galleryIndex - 1] : null
  const zoomAR = zImg?.ar || 1
  const vw = window.innerWidth, vh = window.innerHeight
  const availW = vw * 0.9, availH = vh * 0.86
  let zW, zH
  if (zoomAR >= 1) { zW = Math.min(availW, availH * zoomAR); zH = zW / zoomAR }
  else              { zH = Math.min(availH, availW / zoomAR); zW = zH * zoomAR }

  // walker shadow width
  const shadowW = Math.round(walkerH * 0.426 * 0.66)

  // ── render ───────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', fontFamily: 'Helvetica,"Helvetica Neue",Arial,sans-serif', color: '#1a1a1a' }}>

      {/* ══════════ TOGGLE BAR ══════════ */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', background: '#ffffff', borderBottom: '1px solid #e4e4e4',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 5, color: '#111' }}>
          PIXEL&nbsp;PIX
        </div>
        <div style={{ display: 'flex', gap: 2, border: '1px solid #e4e4e4' }}>
          {[['curate','CURATE'],['gallery','GALLERY']].map(([v, label]) => (
            <button
              key={v}
              onClick={() => { setView(v); setZoomed(false) }}
              style={{
                fontFamily: 'Helvetica,"Helvetica Neue",Arial,sans-serif',
                fontSize: 11, fontWeight: 600, letterSpacing: 2, padding: '11px 22px',
                border: 'none', cursor: 'pointer', transition: 'all .15s',
                background: view === v ? '#111111' : '#ffffff',
                color:      view === v ? '#ffffff' : '#777777',
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* ══════════ CURATE SECTION ══════════ */}
      {view === 'curate' && (
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', background: TONE.wall }}>
          {/* floor strip */}
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 72, background: TONE.floor, boxShadow: `inset 0 1px 0 ${TONE.base}` }} />

          <div style={{ position: 'relative', maxWidth: 840, margin: '0 auto', padding: '128px 24px 120px', textAlign: 'center', minHeight: '100%' }}>

            {/* ─── SELECT phase ─── */}
            {phase === 'select' && (
              <div>
                <div style={{ fontSize: 13, letterSpacing: 4, color: '#9a9a9a', textTransform: 'uppercase' }}>
                  Exhibition intake
                </div>
                <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1, color: '#111', marginTop: 10 }}>
                  Curate
                </div>
                <div style={{ fontSize: 17, marginTop: 12, color: '#6e6e6e', lineHeight: 1.5 }}>
                  Add up to ten photographs. We&rsquo;ll crate them and ship them to your gallery wall.
                </div>

                <div style={{ marginTop: 36, background: '#ffffff', padding: 28, border: '1px solid #e6e6e6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'left' }}>

                  {/* dropzone */}
                  <label
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', padding: 40, background: '#fafafa', border: '1px dashed #cfcfcf' }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
                  >
                    <input
                      type="file" accept="image/*" multiple style={{ display: 'none' }}
                      onChange={e => { handleFiles(e.target.files); e.target.value = '' }}
                    />
                    {/* plus icon */}
                    <div style={{ width: 40, height: 40, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 18, top: 4, width: 4, height: 32, background: '#111' }} />
                      <div style={{ position: 'absolute', left: 4, top: 18, width: 32, height: 4, background: '#111' }} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, color: '#111', textTransform: 'uppercase' }}>
                      Drop or click to add
                    </div>
                    <div style={{ fontSize: 14, color: '#9a9a9a', letterSpacing: 0.5 }}>
                      JPG &middot; PNG &middot; up to 10 photos
                    </div>
                  </label>

                  {/* thumbnail tray */}
                  {has && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 18, marginTop: 24 }}>
                      {images.map(img => (
                        <div key={img.id} style={{ position: 'relative' }}>
                          <div style={{ background: '#fff', padding: 6, boxShadow: '0 0 0 1.5px #111' }}>
                            <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#f0f0f0' }}>
                              <CoverImg src={img.px} />
                            </div>
                          </div>
                          <button
                            onClick={() => removeImage(img.id)}
                            style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, border: 'none', cursor: 'pointer', borderRadius: '50%', background: '#111', color: '#fff', fontFamily: 'inherit', fontSize: 13, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >&times;</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* footer row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 26, paddingTop: 22, borderTop: '1px solid #ededed' }}>
                    <div style={{ fontSize: 13, letterSpacing: 2, color: '#9a9a9a', textTransform: 'uppercase' }}>
                      {n} / 10
                    </div>
                    {has ? (
                      <button
                        onClick={ship}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, letterSpacing: 2, padding: '15px 26px', border: 'none', cursor: 'pointer', background: '#111', color: '#fff', textTransform: 'uppercase' }}
                      >
                        Ship it
                        <span style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '9px solid #fff' }} />
                      </button>
                    ) : (
                      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, padding: '15px 26px', background: '#f0f0f0', color: '#bcbcbc', textTransform: 'uppercase' }}>
                        Ship it
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ─── SHIPPING phase ─── */}
            {phase === 'shipping' && (
              <div style={{ paddingTop: 14 }}>
                <div style={{ fontSize: 13, letterSpacing: 4, color: '#9a9a9a', textTransform: 'uppercase' }}>In transit</div>
                <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, color: '#111', marginTop: 10 }}>Shipping to the gallery</div>
                <div style={{ fontSize: 16, marginTop: 10, color: '#6e6e6e' }}>Crating your works&hellip;</div>

                <div style={{ position: 'relative', marginTop: 32, height: 300 }}>
                  {/* photos dropping into pile */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
                    {images.map((img, i) => {
                      const loaded = i < shippedCount
                      const active = i === shippedCount
                      return (
                        <div
                          key={img.id}
                          style={{
                            width: 72,
                            transition: 'transform .55s cubic-bezier(.5,-0.3,.6,1), opacity .45s ease',
                            transform: loaded ? 'translateY(210px) scale(0.26)' : active ? 'translateY(-6px) scale(1.06)' : 'scale(1)',
                            opacity: loaded ? 0 : 1,
                          }}
                        >
                          <div style={{ background: '#fff', padding: 5, boxShadow: '0 0 0 1.5px #111' }}>
                            <div style={{ height: 60, overflow: 'hidden', background: '#f0f0f0' }}>
                              <CoverImg src={img.px} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* crate-boxes pile / truck */}
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{
                      transition: 'transform 1.4s cubic-bezier(.5,0,.7,1)',
                      transform: truckGone ? 'translateX(150vw)' : 'translateX(0)',
                      animation: 'truckBob .45s steps(2) infinite',
                    }}>
                      <img src="/crate-boxes.png" alt="" style={{ display: 'block', width: 360, height: 'auto', imageRendering: 'pixelated' }} />
                    </div>
                  </div>
                </div>

                {/* progress bar */}
                <div style={{ maxWidth: 420, margin: '6px auto 0', height: 6, background: '#ececec' }}>
                  <div style={{ height: 6, background: '#111', transition: 'width .4s ease', width: shipPct }} />
                </div>
              </div>
            )}

            {/* ─── DELIVERED phase ─── */}
            {phase === 'delivered' && (
              <div style={{ paddingTop: 48, animation: 'fadeUp .4s ease both' }}>
                <div style={{ display: 'inline-block', animation: 'stampPop .5s ease both', background: '#111', color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 3, padding: '16px 28px', textTransform: 'uppercase' }}>
                  Delivered
                </div>
                <div style={{ fontSize: 18, marginTop: 32, color: '#6e6e6e', lineHeight: 1.5 }}>
                  Your photographs are framed and hung. Take a stroll through the gallery.
                </div>
                <button
                  onClick={goGallery}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 28, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, letterSpacing: 2, padding: '16px 28px', border: 'none', cursor: 'pointer', background: '#111', color: '#fff', textTransform: 'uppercase' }}
                >
                  Enter the gallery
                  <span style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #fff' }} />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ══════════ GALLERY SECTION ══════════ */}
      {view === 'gallery' && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: TONE.wall }}>

          {/* baseboard line */}
          <div style={{ position: 'absolute', bottom: FLOOR_H, left: 0, right: 0, height: 1, background: '#d8d8d8' }} />
          {/* floor */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: FLOOR_H, background: TONE.floor, boxShadow: `inset 0 1px 0 ${TONE.base}` }} />

          {/* ── HORIZONTAL TRACK ── */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            display: 'flex', alignItems: 'center',
            transition: 'transform .5s cubic-bezier(.22,.61,.36,1)',
            transform: `translateX(calc(50vw - ${SLOT_W / 2}px - ${galleryIndex * SLOT_W}px))`,
          }}>

            {/* title slot */}
            <div style={{ flex: 'none', width: SLOT_W, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 60 }}>
              <div style={{ fontSize: 13, letterSpacing: 5, color: '#9a9a9a', textTransform: 'uppercase' }}>Exhibition</div>
              <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3, color: '#111', lineHeight: 0.95, marginTop: 14, whiteSpace: 'nowrap' }}>Pixel Pix</div>
              <div style={{ width: 44, height: 2, background: '#111', marginTop: 24 }} />
              <div style={{ fontSize: 15, color: '#9a9a9a', marginTop: 18, letterSpacing: 0.5 }}>use &larr; &rarr; to walk the room</div>
            </div>

            {/* photo slots */}
            {imgList.map((img, i) => {
              const focused = galleryIndex === i + 1
              const { fw, fh } = frameDims(img ? img.ar : 1)
              return (
                <div key={i} style={{ flex: 'none', width: SLOT_W, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 36 }}>
                  <div style={{
                    position: 'relative',
                    transition: 'transform .45s ease, opacity .45s ease',
                    transform: focused ? 'scale(1.06)' : 'scale(0.84)',
                    opacity: focused ? 1 : 0.55,
                  }}>
                    {/* spotlight cone */}
                    <div style={{ position: 'absolute', left: '50%', top: -150, transform: 'translateX(-50%)', width: 160, height: 150, background: 'linear-gradient(to bottom,rgba(0,0,0,0.05),rgba(0,0,0,0))', clipPath: 'polygon(38% 0,62% 0,100% 100%,0 100%)', pointerEvents: 'none' }} />

                    {/* frame */}
                    <div
                      data-frame="1"
                      style={{ position: 'relative', width: fw, height: fh, background: '#fff', padding: 3, boxShadow: '0 0 0 1.5px #111, 0 8px 24px rgba(0,0,0,0.08)' }}
                    >
                      <div style={{ width: '100%', height: '100%', background: '#fff', padding: 22 }}>
                        <div style={{ width: '100%', height: '100%', overflow: 'hidden', boxShadow: '0 0 0 1px #ddd', background: '#f2f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {img ? (
                            <CoverImg src={img.px} />
                          ) : (
                            <div style={{ textAlign: 'center', color: '#bcbcbc' }}>
                              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Empty</div>
                              <div style={{ fontSize: 13, marginTop: 4, color: '#cfcfcf' }}>curate a photo</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* plaque */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 22 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#111', textTransform: 'uppercase' }}>Photo {pad2(i + 1)}</div>
                      <div style={{ fontSize: 12, color: '#9a9a9a', marginTop: 3, letterSpacing: 0.5 }}>archival pixel print</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── WALKER ── */}
          {!zoomed && (
            <div style={{ position: 'absolute', bottom: FLOOR_H - 2, left: '50%', zIndex: 30, transform: `translateX(-50%) scaleX(${dir})` }}>
              <div style={{ position: 'relative', transformOrigin: 'bottom center', animation: 'waddle .52s steps(4,end) infinite' }}>
                <img
                  src="/character.png"
                  alt="gallery visitor"
                  style={{ display: 'block', width: 'auto', imageRendering: 'pixelated', height: walkerH }}
                />
                <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.14)', width: shadowW }} />
              </div>
            </div>
          )}

          {/* ── HUD ── */}
          {!zoomed && (
            <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 40, display: 'flex', gap: 28, alignItems: 'center', background: '#ffffff', padding: '14px 24px', border: '1px solid #e4e4e4', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <KeyCap><ArrowLeft /></KeyCap>
                  <KeyCap><ArrowRight /></KeyCap>
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: '#6e6e6e', textTransform: 'uppercase' }}>Walk</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <KeyCap><ArrowUp /></KeyCap>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: '#6e6e6e', textTransform: 'uppercase' }}>Zoom</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <KeyCap><ArrowDown /></KeyCap>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: '#6e6e6e', textTransform: 'uppercase' }}>Back</div>
              </div>
            </div>
          )}

          {/* ── ZOOM OVERLAY ── */}
          {zoomed && galleryIndex >= 1 && has && images[galleryIndex - 1] && (
            <div
              onClick={() => setZoomed(false)}
              style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(255,255,255,0.96)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, cursor: 'zoom-out', animation: 'fadeUp .25s ease both' }}
            >
              <div style={{ position: 'relative', width: Math.round(zW), height: Math.round(zH), background: '#fff', padding: 8, boxShadow: '0 0 0 1.5px #111, 0 24px 60px rgba(0,0,0,0.18)' }}>
                <div style={{ width: '100%', height: '100%', background: '#fff', padding: 26 }}>
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden', boxShadow: '0 0 0 1px #ddd', background: '#f2f2f2' }}>
                    <CoverImg src={images[galleryIndex - 1].px} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: '#111', textTransform: 'uppercase' }}>
                  Photo {pad2(galleryIndex)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#9a9a9a', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', animation: 'hintPulse 1.4s ease-in-out infinite' }}>
                  <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #d6d6d6', borderRadius: 4 }}>
                    <ArrowDownSm />
                  </div>
                  Back to wall
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  )
}
