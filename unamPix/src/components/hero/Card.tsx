interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const Card = ({ icon, title, description }: Props) => {
  return (
    <section className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/80 shadow-sm text-center">
      <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </section>
  );
};
