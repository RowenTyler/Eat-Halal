import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockRestaurants } from "@/lib/mock-data";

export default function AdminRestaurantsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Restaurant Inventory</h1>
              <p className="text-muted-foreground">Monitor all listed restaurants and verify their certification status.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Restaurant listings</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Certification</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reviews</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRestaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell>{restaurant.name}</TableCell>
                        <TableCell>{restaurant.city}</TableCell>
                        <TableCell>{restaurant.certificationBody ?? "N/A"}</TableCell>
                        <TableCell>{restaurant.isVerified ? "Verified" : "Pending"}</TableCell>
                        <TableCell>{restaurant.reviewCount}</TableCell>
                      </TableRow>
                    ))}
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
