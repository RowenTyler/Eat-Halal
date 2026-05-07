"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Store,
  Users,
  FileCheck,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { mockRestaurants } from "@/lib/mock-data";

// Mock admin data
const dashboardStats = [
  { label: "Total Restaurants", value: "2,547", change: "+124", icon: Store },
  { label: "Active Users", value: "15,234", change: "+1,205", icon: Users },
  { label: "Pending Claims", value: "23", change: "-5", icon: FileCheck },
  { label: "Verification Queue", value: "12", change: "+3", icon: Shield },
];

const registrationData = [
  { month: "Jan", restaurants: 45, users: 320 },
  { month: "Feb", restaurants: 52, users: 380 },
  { month: "Mar", restaurants: 61, users: 420 },
  { month: "Apr", restaurants: 78, users: 510 },
  { month: "May", restaurants: 92, users: 620 },
  { month: "Jun", restaurants: 124, users: 750 },
];

const verificationStatus = [
  { name: "Verified", value: 1876, color: "#22c55e" },
  { name: "Pending", value: 423, color: "#eab308" },
  { name: "Rejected", value: 248, color: "#ef4444" },
];

const pendingClaims = [
  {
    id: "1",
    restaurant: "Spice Route",
    claimant: "Ahmed Hassan",
    date: "2024-01-15",
    status: "pending",
  },
  {
    id: "2",
    restaurant: "Kebab King",
    claimant: "Sara Ali",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: "3",
    restaurant: "Tandoori Nights",
    claimant: "Omar Khan",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: "4",
    restaurant: "Mediterranean Grill",
    claimant: "Fatima Ahmed",
    date: "2024-01-13",
    status: "pending",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn />
      <div className="flex-1 flex">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of platform activity and management
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <ArrowUpRight className="h-3 w-3" />
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold mt-4">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Registration Trends */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>
                    Monthly restaurant and user registrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={registrationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="restaurants"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                          name="Restaurants"
                        />
                        <Bar
                          dataKey="users"
                          fill="hsl(var(--chart-2))"
                          radius={[4, 4, 0, 0]}
                          name="Users"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>Restaurant verification breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={verificationStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {verificationStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {verificationStatus.map((status) => (
                      <div key={status.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: status.color }}
                        />
                        <span className="text-sm">{status.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Claims Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending Claims</CardTitle>
                  <CardDescription>
                    Restaurant ownership claims awaiting review
                  </CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/admin-dashboard/claims">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Claimant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">
                          {claim.restaurant}
                        </TableCell>
                        <TableCell>{claim.claimant}</TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                            <Button size="sm" variant="default">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/admin-dashboard/verification">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold">Verification Queue</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      12 pending verifications
                    </p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/admin-dashboard/duplicates">
                  <CardContent className="p-6">
                    <AlertTriangle className="h-8 w-8 text-yellow-500 mb-4" />
                    <h3 className="font-semibold">Duplicate Detection</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      5 potential duplicates
                    </p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/admin-dashboard/restaurants">
                  <CardContent className="p-6">
                    <Store className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold">Manage Restaurants</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      View all listings
                    </p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/admin-dashboard/users">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold">User Management</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage user accounts
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
