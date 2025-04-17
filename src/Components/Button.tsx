type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "Primary" | "Secondary" | "Blank" | "Angry";
  sizing?: "LessPadding";
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const Button = ({
  children,
  onClick,
  disabled,
  style,
  variant = "Primary",
  sizing,
}: ButtonProps) => {
  return (
    <button
      className={`Button ${variant} ${sizing}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};
