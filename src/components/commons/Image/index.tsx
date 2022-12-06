import { forwardRef, useState } from "react";
import type { LegacyRef } from "react";
import Box, { BoxProps } from "../Box";

type ImageProps = BoxProps & {
  src: string;
  customFallback: string;
  alt: string;
};

const Image = (
  { src, customFallback = "", alt, ...rest }: ImageProps,
  ref: LegacyRef<HTMLImageElement> | undefined
) => {
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <Box
      as="img"
      style={{
        objectFit: "cover",
      }}
      src={fallback || src}
      alt={alt}
      onError={handleError}
      ref={ref}
      {...rest}
    />
  );
};

export default forwardRef(Image);
