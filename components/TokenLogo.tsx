import React, { useEffect, useState } from 'react';
import { TokenInfo } from '@decent.xyz/box-common';

const fallbackSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM89h8AApEBx2iaqpQAAAAASUVORK5CYII=';

export const TokenLogo = ({
  token,
  className = 'box-large-icon',
}: {
  token?: Pick<TokenInfo, 'logo'>;
  className?: string;
}) => {
  const logo = token?.logo;
  const [src, setSrc] = useState(logo);
  useEffect(() => {
    if (logo != src) setSrc(logo);
  }, [logo]);

  return (
    <>
      <img
        className={className + ' ' + (src ? '' : 'box-missing-img ')}
        src={src || fallbackSrc}
        alt="token"
        onError={() => setSrc(undefined)}
      />
    </>
  );
};