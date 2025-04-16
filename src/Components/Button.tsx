type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "Primary" | "Secondary" | "Blank" | "Angry";
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const Button = ({
  children,
  onClick,
  disabled,
  style,
  variant = "Primary",
}: ButtonProps) => {
  return (
    <button
      className={`Button ${variant}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};
