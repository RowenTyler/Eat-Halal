import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const duplicatePairs = [
  { id: "d_001", primary: "Bo-Kaap Kitchen", duplicate: "Bo-Kaap Kitchen 2", similarity: "92%" },
  { id: "d_002", primary: "Durban Spice", duplicate: "Durban Spice Express", similarity: "88%" },
];

export default function AdminDuplicatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Duplicate Listings</h1>
                <p className="text-muted-foreground">Review potential duplicate restaurants and merge or remove listings.</p>
              </div>
              <Button>Refresh matches</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Duplicate candidates</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Primary Listing</TableHead>
                      <TableHead>Duplicate Candidate</TableHead>
                      <TableHead>Similarity</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {duplicatePairs.map((pair) => (
                      <TableRow key={pair.id}>
                        <TableCell>{pair.primary}</TableCell>
                        <TableCell>{pair.duplicate}</TableCell>
                        <TableCell>{pair.similarity}</TableCell>
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
