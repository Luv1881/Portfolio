import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import NextImage from "next/image";

const Img = (props: ComponentProps<typeof NextImage>) => (
  <NextImage {...props} alt={props.alt ?? ""} />
);

export const mdxComponents: MDXComponents = {
  img: Img,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}
