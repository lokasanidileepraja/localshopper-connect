
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCcw, Download } from "lucide-react";

const QuickActionsPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" /> New Item
        </Button>
        <Button size="sm" variant="outline">
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPlaceholder;
