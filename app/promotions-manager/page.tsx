import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const promotions = [
  {
    id: "p_001",
    name: "Lunch Special",
    description: "20% off set meals during weekday lunch hours.",
    status: "Live",
    expires: "2025-01-31",
  },
  {
    id: "p_002",
    name: "Friday Family Feast",
    description: "Free dessert for families of four or more.",
    status: "Draft",
    expires: "2025-03-15",
  },
  {
    id: "p_003",
    name: "Ramadan Iftar Combo",
    description: "Special iftar pricing with drinks included.",
    status: "Upcoming",
    expires: "2025-04-10",
  },
];

export default function PromotionsManagerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="owner" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Promotions Manager</h1>
                <p className="text-muted-foreground">Create and update special offers to attract more diners.</p>
              </div>
              <Button>Create promotion</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {promotions.map((promotion) => (
                <Card key={promotion.id}>
                  <CardHeader>
                    <CardTitle>{promotion.name}</CardTitle>
                    <CardDescription>{promotion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                      <span>Expires {promotion.expires}</span>
                      <Badge variant={promotion.status === "Live" ? "secondary" : promotion.status === "Draft" ? "outline" : "default"}>
                        {promotion.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Pause</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
