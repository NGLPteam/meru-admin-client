# Meru Admin UI

## Development Environment

```sh
yarn install
yarn run dev # to start dev client
```

That's it! Now go to http://localhost:3000/

### Client architecture

- `/pages` — a single component that dynamically generates static pages for all routes.
- `/components` — all React components for generating portions of static pages. These are further organized by type (see below).
- `/theme` — global styles, mixins, and font files. Component styles are defined in the same directory as their components using `styled-components`, and are compiled into a single stylesheet on the server.
- `/types` — reusuable types for recurring data structures like pages, images, locales, etc.
- `/public` — static assets like favicons that are passed directly to the output directory without hashing.

### Component architecture

The components are separated out into these folders:

- `/atomic/` - Small, reusable components such as links, buttons, and inputs. Should not be tied to any particular routes, models, or other api data.
- `/auth/` - Shared authentication components
- `/composed/` - Larger, reusable composed components such as page layouts. Can be tied to api data structures.
- `/factories/` - Mapped components with shared props, such as icons
- `/form/` - Form atomics and scaffolding
- `/layout/` - Small reusable layout components such as grids and cards
- `/global/` - Composed, app wide components, that are visible on every page
- `/svgs/` - Svgs, such as icons and logos

Folders are lower case if they contain a collection of components, and camel case if they contain one component or a component with parent/child relationships. Components can be grouped into sub folders, ie `/atomic/buttons/` and `/composed/entities/`, but further nesting should be avoided.

Folders that contain many components should have an `index.ts` file with default exports. Single components should be in a camel cased folder, with an index, stories, and styles file (if applicable). For example:

```
components/global/Header
index.tsx // Exports the component
Header.tsx // Defines the component
styles.ts // Styled components
```

### Browser support

- Edge (Chromium latest)
- Firefox (Windows and OSX)
- Chrome (Windows and OSX)
- Safari
- Latest release of Safari on iOS and Chrome on Android
