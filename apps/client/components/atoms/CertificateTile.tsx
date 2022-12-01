import Image from 'next/image';
import Link from 'next/link';
import type { Nft } from '@dinan/types/Nft';

type CertificateTileProps = {
  cert: Nft;
  ownerAddress: string | undefined;
};

export const CertificateTile = ({
  cert,
  ownerAddress,
}: CertificateTileProps) => {
  return (
    <div className="bg-slate-200 rounded-md hover:scale-105 transition-transform hover:cursor-pointer">
      <Link
        href={{
          pathname: '/certificates/[address]',
          query: {
            address: cert.contract.address,
            tokenId: cert.id.tokenId,
            ownerAddress,
          },
        }}
      >
        <Image
          className="rounded-t-md"
          src={cert.metadata.image}
          alt={`${cert.metadata.name} NFT certificate`}
          width={350}
          height={350}
        />
        <p className="py-2 text-center text-orange-400">{cert.metadata.name}</p>
      </Link>
    </div>
  );
};
