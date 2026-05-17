import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockReviews, mockRestaurants } from "@/lib/mock-data";

export default function ReviewManagementPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="owner" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Review Management</h1>
                <p className="text-muted-foreground">Moderate customer feedback and respond to reviews for your restaurant.</p>
              </div>
              <Button>Review guidelines</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Latest reviews</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Excerpt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReviews.slice(0, 12).map((review) => {
                      const restaurant = mockRestaurants.find((r) => r.id === review.restaurantId);
                      return (
                        <TableRow key={review.id}>
                          <TableCell>{restaurant?.name ?? "Unknown"}</TableCell>
                          <TableCell>{review.userName}</TableCell>
                          <TableCell>{review.rating}/5</TableCell>
                          <TableCell>{review.createdAt}</TableCell>
                          <TableCell>{review.body.slice(0, 70)}...</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
