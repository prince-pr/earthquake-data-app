export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className={`w-18 h-18 border-8 border-[#8c88d6] border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
}
