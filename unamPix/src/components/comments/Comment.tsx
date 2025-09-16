interface Props {
  texto: string;
  fecha: string;
  nombres: string;
}

export const Comment = ({ texto, fecha, nombres }: Props) => {
  const initialUsers = () => {
    let initials = "";
    if (nombres) {
      const nameParts = nombres.split(" ");
      initials = nameParts
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    }
    return initials;
  };

  return (
    <div className="flex">
      <div>{initialUsers()}</div>
      <strong>{nombres}: </strong> {texto}
      <span>{fecha}</span>
    </div>
  );
};
