# Source assets (not served)

Files in this folder are **not** part of the website. Anything in `public/` is
downloadable by anyone; these files are kept here instead so they are never
served by Next.js.

## `brand/` (committed)

Brand originals that no page currently uses, kept out of `public/` so they are
not downloadable:

| File | Notes |
| --- | --- |
| `ansok-ai-logo-horizontal.png` | Original logo on white (508 KB). The site uses the transparent and on-dark versions in `public/assets/`. |
| `ansok-ai-logo-square.jpg` | Square logo – suitable as a social-media profile avatar. |

## `private-screenshots/` (git-ignored)

Original, unmodified screenshots that must not be published:

| File | Why it is private |
| --- | --- |
| `website-desktop-hero.jpg` | Original marketing-site screenshot with unverified statistics (112+ användare, 500+ jobbsökare, 1,200+ ansökningar/månad, 1,247 ansökningar, 87% framgångsrate, "2 minuters setup"). The website uses the cleaned copy `public/assets/website-desktop-hero-investor-safe.jpg`. |
| `website-mobile-homepage-demo-video.jpg` | Shows the staging URL and a hand-drawn annotation. |
| `app-mobile-navigation-menu.jpg` | Shows the app menu and a user profile photo. |

The folder is listed in `.gitignore`, so these files stay on this machine and
do not end up in the git history. Back them up separately if you need them.
