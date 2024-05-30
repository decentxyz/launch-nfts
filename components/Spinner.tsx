const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-[23px] w-[23px] border-t-2 border-b-2 border-gray-700"></div>
    </div>
  );
};

export default LoadingSpinner;