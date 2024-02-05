import { Webpage } from "./types";

export const fetch = (url: string): Promise<Webpage> => {
  const webpage = webpageMap.get(url);
  const delay = Math.random() * 500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (webpage) {
        resolve(webpage);
      } else {
        reject(new Error('404'));
      }
    }, delay);
  });
};

const webpageMap = new Map<string, Webpage>();

const registerWebpage = (webpage: Webpage) => {
  webpageMap.set(webpage.url, webpage);
};

registerWebpage({
  url: '/index',
  content: [
    {type: 'text'},
    {type: 'link', href: '/features'},
    {type: 'link', href: '/about'},
    {type: 'link', href: '/dashboard'},
    {type: 'link', href: '/contact'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/features',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'text'},
    {type: 'link', href: '/features/123'},
    {type: 'link', href: '/features/345'},
    {type: 'link', href: '/about'},
    {type: 'link', href: '/dashboard'},
    {type: 'link', href: '/contact'},
  ],
});

registerWebpage({
  url: '/features/123',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'link', href: '/features'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/features/345',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'link', href: '/features'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/about',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'link', href: '/features'},
    {type: 'link', href: '/dashboard'},
    {type: 'link', href: '/contact'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/dashboard',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'link', href: '/dashboard/user'},
    {type: 'link', href: '/dashboard/posts'},
    {type: 'link', href: '/dashboard/settings'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/contact',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/dashboard/user',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'link', href: '/dashboard'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/dashboard/posts',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    // {type: 'link', href: '/dashboard/posts/123'},
    {type: 'link', href: '/dashboard'},
    {type: 'text'},
  ],
});

registerWebpage({
  url: '/dashboard/settings',
  content: [
    {type: 'text'},
    {type: 'link', href: '/index'},
    {type: 'link', href: '/dashboard'},
    {type: 'text'},
  ],
});
