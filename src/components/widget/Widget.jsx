import Card from "components/card";

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="!flex-row flex-grow items-center justify-between px-4 rounded-[20px]">

      <div className="h-50 ml-2 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-[#474747]">{title}</p>
        <h4 className="text-xl font-bold text-[#151515] dark:text-white">
          {subtitle}
        </h4>
      </div>
      <div className="flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

    </Card>
  );
};

export default Widget;
