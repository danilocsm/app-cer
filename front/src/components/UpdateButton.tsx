interface UpdateButtonProps {
  onClick: () => void;
  style: string;
}

function UpdateButton({ style, onClick }: UpdateButtonProps) {
  return (
    <button className={`static ${style}`} onClick={onClick}>
      Atualizar
    </button>
  );
}

export default UpdateButton;
