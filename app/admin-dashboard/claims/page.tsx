import Header from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const pendingClaims = [
  { id: "c_001", restaurant: "Bismillah Restaurant", claimant: "Ahmed Hassan", submitted: "2025-01-15", status: "Pending" },
  { id: "c_002", restaurant: "Bo-Kaap Kitchen", claimant: "Sara Ali", submitted: "2025-01-12", status: "Pending" },
  { id: "c_003", restaurant: "Durban Spice", claimant: "Omar Khan", submitted: "2025-01-10", status: "Review" },
];

export default function AdminClaimsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Claim Requests</h1>
                <p className="text-muted-foreground">Review and approve ownership claim applications.</p>
              </div>
              <Button>Export CSV</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending claims</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Claimant</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>{claim.restaurant}</TableCell>
                        <TableCell>{claim.claimant}</TableCell>
                        <TableCell>{claim.submitted}</TableCell>
                        <TableCell>
                          <Badge variant={claim.status === "Pending" ? "secondary" : "outline"}>{claim.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="secondary">Review</Button>
                        </TableCell>
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
