const StatDisplay = ({
  title,
  subTitle,
  stat,
  textColor = "text-primary",
}: {
  title: string;
  subTitle?: string;
  stat: string;
  textColor?: string;
}) => {
  return (
    <div className="stats">
      <div className="stat place-items-center">
        <div className="stat-title">{title}</div>
        <div className={`stat-value ${textColor}`}>{stat}</div>
        <div className="stat-desc">{subTitle}</div>
      </div>
    </div>
  );
};

export { StatDisplay };
