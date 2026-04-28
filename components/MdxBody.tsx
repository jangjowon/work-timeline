import { MDXRemote } from 'next-mdx-remote/rsc';
import ImageLightbox from './ImageLightbox';

type Props = {
  source: string;
};

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

const components = {
  img: ({ src, alt }: ImgProps) => {
    if (typeof src !== 'string' || src.length === 0) return null;
    return <ImageLightbox src={src} alt={alt ?? ''} />;
  },
};

export default function MdxBody({ source }: Props) {
  return (
    <div className="prose prose-timeline max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
