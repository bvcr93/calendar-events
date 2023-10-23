interface WeekHeaderProps {
  weekDay: string;
}
export function WeekHeader({ weekDay }: WeekHeaderProps) {
  return (
    <div className="flex-grow w-full text-emerald-600 h-12 flex items-center justify-center bg-teal-100 md:text-lg text-xs">
      <div>{weekDay}</div>
    </div>
  );
}
