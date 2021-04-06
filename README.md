Setup

- `npm install`
- Boot with `npm run dev`

Next step https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths

[Routing documentation](https://nextjs.org/docs/routing/introduction)


# Notes

Auto-gen classnames so don't have to worry about collision

## Pre-rendering and hydration

First page load is pre-rendered (more work server side?)
Future pages / clicks hydrate

- Static Generation - built once at build time and reused for all requests
- Server side rendering - Generates page on each request (standard ERB style)

### `getStaticProps`

Runs ONCE at build time (runs every request for dev). This allows us to get dependent data before building the page the ONE time.

If you want this to run on a page, call this:

```js
export async function getStaticProps() {
  const data = ... // fetch the data

  // return the data as props
  return {
    props: {
      data
    }
  }
}
```

Hot takes:

- Since this runs only once and it runs server side, **we can call the db directly in this function**
- This can only be called from a _page_
- Cannot use query params in here

### `getServerSideProps`

Runs every request

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

Use [swr](https://swr.vercel.app/) for client side fetching. It handles some extra optimization.

```js
import useSWR from 'swr'
```

## Dynamic Routes

We can build all possible pages statically here so we still get some sweet SEO

**QUESTION: If SEO isn't a concern, is this needed? If we have a site with thousands of blog posts, will these static pages be sitting there taking up space? Slow down our boot/deploy/startup?**

### `getStaticPaths`

Get all possible paths (e.g. blog post IDs)

```js
export async function getStaticPaths() {
  const data = ... // get data
  return {
    data,
    fallback: false
  }
}
```
