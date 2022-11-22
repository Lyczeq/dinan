export type Nft = {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
  };
  metadata: Metadata;
  contractMetadata: ContractMetadata;
};

type Metadata = {
  image: string;
  name: string;
  description: string;
};

type ContractMetadata = {
  symbol?: string;
};
