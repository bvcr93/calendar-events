interface WeekHeaderProps {
  weekDay: string;
}
export function WeekHeader({ weekDay }: WeekHeaderProps) {
  return (
    <div className="flex-grow text-green-600 h-12 flex items-center justify-center bg-green-200">
      <div>{weekDay}</div>
    </div>
  );
}
