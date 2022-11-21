import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Nft } from '@dinan/types/Nft';

type CertificateTileProps = {
  cert: Nft;
};

export const CertificateTile = ({ cert }: CertificateTileProps) => {
  const router = useRouter();

  const navigateToCertificateDetails = () => {
    router.push(`/certificates/${cert.contract.address}-${cert.id.tokenId}`);
  };

  return (
    <div
      className="bg-slate-200 rounded-md hover:scale-105 transition-transform hover:cursor-pointer"
      onClick={navigateToCertificateDetails}
    >
      <Image
        className="rounded-t-md"
        src={cert.metadata.image}
        alt={`${cert.metadata.name} NFT certificate`}
        width={400}
        height={400}
      />
      <p className="py-2 text-center text-orange-400">{cert.metadata.name}</p>
    </div>
  );
};
