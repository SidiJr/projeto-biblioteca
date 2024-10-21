import clsx from "clsx";

const SubHeader = ({ title }) => {
  return (
    <div
      className={clsx(
        "w-full",
        "bg-custom-50",
        "flex",
        "justify-between",
        "h-28",
        "items-center",
        "px-20",
        "mb-4",
        "mt-20"
      )}
    >
      <div className={clsx("flex", "h-3/4", "justify-between")}>
        <div className={clsx("flex", "w-1/4", "justify-center")}>
          <img
            className="object-contain"
            src="images/logo_branco.png"
            alt="Logo"
          />
        </div>
        <div className={clsx("flex", "w-1/4", "justify-center")}>
          <h1
            className={clsx(
              "flex",
              "text-center",
              "items-center",
              "text-green-600",
              "text-2xl"
            )}
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
