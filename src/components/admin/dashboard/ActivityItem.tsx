
import { ReactNode } from "react";

interface ActivityItemProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({ icon, iconBg, title, description, time }: ActivityItemProps) => (
  <div className="flex items-center p-2 bg-muted/50 rounded-md">
    <div className={`mr-4 ${iconBg} p-2 rounded-full`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <div className="text-xs text-muted-foreground">{time}</div>
  </div>
);

export default ActivityItem;
