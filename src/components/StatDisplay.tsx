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
        <div className="stat-title dark:text-blue-200">{title}</div>
        <div className={`stat-value ${textColor}`}>{stat}</div>
        <div className="stat-desc dark:text-blue-200">{subTitle}</div>
      </div>
    </div>
  );
};

export { StatDisplay };
