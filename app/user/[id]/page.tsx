import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = mockUsers.find((item) => item.id === params.id);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">User not found</h1>
            <p className="text-muted-foreground mt-2">The requested profile does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Card>
            <CardContent className="space-y-4 text-center">
              <Avatar className="mx-auto h-28 w-28">
                <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <p className="text-sm text-muted-foreground">{user.level}</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{user.email}</p>
                <p>{user.bio}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity summary</CardTitle>
                <CardDescription>Profile engagement and recent contributions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                    <p className="text-xl font-semibold">{user.reviewCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member since</p>
                    <p className="text-xl font-semibold">{new Date(user.joinedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bio</p>
                    <p className="text-xl font-semibold">{user.level.split(" ")[0]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
