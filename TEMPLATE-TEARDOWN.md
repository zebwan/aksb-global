# fluid.glass — measured teardown (15 Sep 2026)

Reference for the AKSB Global v2 rebuild. Everything below was read from the live site's
bundles (Nuxt 3, GSAP 3 + ScrollTrigger + DrawSVG, Lenis, SplitText-style line splitting) and
its scoped CSS — not guessed. Site by Exo Ape.

## Stack facts
- Fixed `html, body` (`position:fixed; inset:0; overflow:hidden`); a fixed `.scroll` wrapper
  (`overflow: hidden auto`) is the Lenis wrapper, `.content` the Lenis content. No WebGL, no canvas.
- Fluid type: `html { font-size: calc(100vw / 1600 * 10) }` on desktop, `/375` on ≤600px. So
  `1rem = 10px at 1600 wide` and every size below is in those rem.
- Grid: 24 columns, `grid-column-gap: 2rem`, page margin `4rem` (mobile 6 columns, 1.5rem gap, 2rem margin).
- Fonts: Aeonik Pro 400/700 (body + headings), Aeonik Mono 500/600 (labels, buttons, uppercase, 0.08–0.1em tracking).
- Colours: `--color-black #0b1012`, `--color-grey #212325` (dark sections), `--color-cream #f3f0ec` (page),
  `--color-taupe #d4cec6`, `--color-white`, `--color-yellow #f1a400` (unused on home).
- Eases: quart/cubic/quad in-out and out as CSS vars; GSAP uses `power3.out`, `power3.inOut`, `none` for scrubs.
- Lenis: default options (lerp 0.1 / duration 1.2), `scroll:onStart` fired after the page fade-in.

## Type scale (desktop rem)
- Hero heading 6.4rem / 1 / -0.03em, grid-column 6/20, centred.
- Section big headings (text-cta, featured-projects, blockquote, banner-cta) 6.4rem / 1 / -0.03em.
- Mid headings (showroom, product block titles) 4rem / 1 / -0.02em. Project row titles 2.4rem / 1.2.
- Body text 1.6–1.8rem / 1.3. Mono labels 1.2rem / 1.3 uppercase 0.08em; base-title 1.4rem 600 0.1em with a
  0.6rem rotated-square "diamond" before it. Buttons 1.2rem mono, padding 1.5rem 2.4rem.

## Global components
| Component | Behaviour (measured) |
|---|---|
| **Intro loader** | Cream full-screen. 3D CSS cube (3rem, faces `currentColor`) rotates `rotateX(-30) rotateY(0→-315) scaleY(.78)` 1.5s quad in-out while cube scales `0→.95` + `yPercent 100→0` (1.5s power3.inOut). At 1.5s brandmark gets a hexagon `mask-image`; at 1.3s wordmark slides `xPercent 41→0` (1s power3.inOut) as cube moves `xPercent 100, yPercent 50` and wordmark lines rise `yPercent 150→0` stagger .05. At 2.2s z-index swap, at 2.3s logo flies `y: -viewportH/3, autoAlpha 0` (1.2s). Page content: image `scale 1.1→1` (1.2s) and page `scale .8→1, rotate .01` (1s power3.inOut). |
| **Page header** (top) | Absolute, 6rem tall, wordmark centred, "Get a quote" button right (opens quote panel). White on hero. `visibility:hidden` until intro completes. |
| **Header pill** (bottom-centre, fixed) | 27.6rem×5rem, `bottom:4rem`, `backdrop-filter: blur(2rem)`, bg `black 80%`. Logo mark 5rem left, mono title 17rem centre, burger 5rem right. Build-in after intro: `delay 3, duration 1, power3.inOut`: title `yPercent 200→0`, pill `width 5rem→27.6rem` (+.3s), logo `x 11.3rem→0` (+1s). Title swap: `yPercent 0→-100 .6s power3.in`, set `100`, `→0 .6s power3.out`. Long titles marquee `x` yoyo linear. Hidden in footer (`is-footer`). Menu open: pill collapses to `5rem` and shows a close icon (`.6s power3.inOut`). |
| **Menu** | Panel 40rem, `bottom:10rem`, blur glass. Open: bg `scale 0→1` (transform-origin bottom, power3.inOut), links `yPercent 150→0` stagger .02 .8s power3.inOut, sub-links fade .3s delay; page dims via `main:before` 40% black, 1s. Hover: other links dim to 40%, hovered 100%; a 0.6rem rotated square marks the active item. |
| **Cursor** | 10rem×4.4rem glass pill (blur 2rem, gradient white 15→20%), mono label ("View"), follows pointer with `translate3d`, `opacity .2s`; shown on product blocks and duo images; hidden on touch. |
| **Buttons** (`.base-button`) | Arrow SVG (14×11: an L-path + rotated square) + label with two stacked `.line` copies in a 1rem-high clipped box. Hover: lines `yPercent -100` (1s power3.out), arrow rect `drawSVG 0% 50% → 50% 150%`, path `-100% → 0%`. Variants: `is-black` (bg black, white text), `is-white` (white 20% + blur), `is-alpha` (text only). |
| **Icon "shoot-through"** (arrow nav) | Hover: icon `xPercent 0→200 .5s power3.in`, set `-200`, `→0 .5s power3.out`. |
| **Line reveal** (all big text) | Text split into `.line-mask > .line` (`overflow:clip`; mask `margin:-2rem 0; padding:1rem 0` so descenders aren't clipped). Set `yPercent 200`; on `trigger top bottom` → `yPercent 0, stagger .1, duration 1.5, power3.out`, optional delay. |
| **Image enter** | `scale 1.1 → 1, 1s power3.out`. Hover on blocks: `scale 1.1, 1s power3.out`; leave `scale 1, 2s`. |
| **Page enter/leave** | Enter: `yPercent 100→0` and `scale .8→1 rotate .01` 1s power3.inOut; leave `autoAlpha .5` 1.3s. Page fade-in `autoAlpha 0→1 1.5s power3.out`. |
| **Quote panel** | Fixed right, 121.6rem wide, cream, padding 4rem; slides `xPercent 100→0` 1s power3.inOut while the page shifts `xPercent 0→-50`; close button 4.2rem fixed top-right. Heading 6.4rem, side text at `left:49.3rem`, rows with 1px top borders, toggle pill buttons (4.4rem tall, mono), textarea 14.8rem. |
| **Cookies** | Cream card 48rem bottom-right, appears `autoAlpha` after 5s. |
| **Debug grid** | 24 red columns at 10% (dev only). |

## Home sections (in order)
1. **home-header** — full-bleed background (video with poster, `opacity .8`, gradient overlay `transparent→black` at `.5`). Row 1 `100svh`, heading bottom-aligned (`padding 16rem 0`). Row 2: base-title absolutely top-centre, text at cols 20/25, 1px top rule 86rem wide right-aligned, `padding 2rem 0 32.8rem`. Scrub `top top → bottom top`: heading `autoAlpha 1→0` in the first 10%, background `yPercent 0→50`. Mobile: "Scroll to explore" indicator.
2. **text-cta** — `margin 15rem 0`, centred; base-title, 100.6rem-wide 6.4rem statement (line reveal), `is-black` button.
3. **product-collection** — 1px top rule; text block absolutely at `inset 22rem 23.2rem auto auto` (30.1rem wide); 4 blocks aspect 500/617 on the 24-col grid: b1 `8/15`, b2 `18/24 mt 45rem`, b3 `1/7 mt 4.5rem`, b4 `12/17 mt -17rem`; white 4rem title centred over image. Each block parallaxes `y: 0 → t` (scrub `top bottom → bottom top`), hover scale 1.1 + cursor "View".
4. **banner-showroom** — dark, `height 200svh`, sticky `100svh` container. Scrub `top top → bottom bottom`: left column `x: 65vw→0`, right column `x: -65vw→0`, rule `scaleX 0→1` (152rem, `margin-top:-20rem`), media `opacity .7 scale .55 → 1 1`. Heading 4rem 45rem wide; address block mono title + text; `is-white` glass button. Click → fullscreen video player. Mobile: single 100svh, play icon.
5. **featured-projects** — 1px rule; base-title cols 1/11, content 11/25 (6.4rem heading + button); rows list `margin-top 12rem`: title 2.4rem at 40% opacity (38.5rem), pill tags (mono, 2.6rem tall, 2rem radius, 40%), arrow at 20%; hover: everything to 100%, border darkens, a 23.6×29.6rem image fades in (`opacity .3s`) at `left 29.7rem`.
6. **assets-duo** — two blocks on the grid (`is-portrait-6`: 5/13 and 13/25); scrub `top bottom → bottom top`: block 1 `yPercent 50→0`, block 2 `-50→0`; hover scale 1.1 + cursor.
7. **reviews** — 1px rule; indicator `01 / 05` at `left 38.5rem`; arrow nav top-right (5rem squares); blocks stacked absolutely, active one visible: quote icon at `left 32rem`, blockquote 6.4rem cols 7/23, greyscale portrait 17.3rem (aspect 173/213) at left, author 2.4rem + mono role; rating link bottom-right. Change: old block `autoAlpha 1→0`, new `0→1` (power3.inOut), new lines `yPercent ±200→0` stagger ±.1, 1.5s power3.out (direction-aware).
8. **banner-cta** — bordered container `padding 18rem 4.4rem`; base-title, 70.6rem 6.4rem heading, `is-black` + `is-alpha` buttons; decorative 42.8×61rem line SVG right at 20% grey, `drawSVG` scrubbed `0%→-100%` then `100%→-0%` across `top bottom → bottom top`.
9. **footer** — `100svh`, black; background image (object-position bottom) with gradient `transparent 50% → black 70%`; giant wordmark as an SVG `mask-image` (152.3×25.4rem, `bottom 11rem`, opacity .3) with a 1.5× copy of the image inside; scrub `top bottom → bottom bottom`: content `yPercent -50→0`, mask-position `0%→80%`. Menu panel shows in the footer; bottom bar: copyright, socials, legal, credit; link underline `scaleX 0→1 .5s cubic-bezier(1,0,0,1)` from right, hover from left.
