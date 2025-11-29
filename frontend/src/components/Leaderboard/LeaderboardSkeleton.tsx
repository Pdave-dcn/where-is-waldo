import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const LeaderboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-56" />

        {/* Game Image Card Skeleton */}
        <Card className="overflow-hidden">
          <CardHeader>
            <Skeleton className="h-9 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-5 w-1/2 mx-auto" />
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>

        {/* Leaderboard Table Skeleton */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-9 w-40" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20 text-center">
                    <Skeleton className="h-5 w-12 mx-auto" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-5 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-5 w-16" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-5 w-20" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      <Skeleton className="h-6 w-6 mx-auto rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
