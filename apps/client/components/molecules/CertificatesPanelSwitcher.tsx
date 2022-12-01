type CertificatesPanelSwitcherProps = {
  showMyCertificates: boolean;
  handleShowMyCertificates: VoidFunction;
};

export const CertificatesPanelSwitcher = ({
  handleShowMyCertificates,
  showMyCertificates,
}: CertificatesPanelSwitcherProps) => {
  const tileClasses = `text-white w-1/2 text-center py-2 hover:cursor-pointer
    hover:bg-primary transition-colors`;

  return (
    <div className="w-full mx-auto flex flex-row bg-secondary rounded-lg">
      <button
        onClick={handleShowMyCertificates}
        className={`${tileClasses} rounded-tl-lg rounded-bl-lg ${
          showMyCertificates && 'bg-primary font-bold'
        }`}
      >
        My Certificates
      </button>
      <div
        onClick={handleShowMyCertificates}
        className={`${tileClasses} rounded-tr-lg rounded-br-lg ${
          !showMyCertificates && 'bg-primary font-bold'
        }`}
      >
        User Certificates
      </div>
    </div>
  );
};
