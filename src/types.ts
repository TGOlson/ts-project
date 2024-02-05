export type Element = 
  {type: 'text'} |
  {type: 'link', href: string};

export type Webpage = {
  url: string;
  content: Element[];
};
