interface SearchButtonProps {
  onClick: () => void;
}

function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      className="w-[70px] h-[8vh] p-2 rounded-[20px] bg-cerPurple border-2 hover:bg-white focus:border-black focus:outline-1 shadow-cerShadow"
      onClick={() => {
        onClick();
      }}
    >
      Ir
    </button>
  );
}

export default SearchButton;
