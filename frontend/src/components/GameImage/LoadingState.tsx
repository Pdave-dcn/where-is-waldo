import { Card, CardContent } from "../ui/card";
import { Loader } from "../ui/loader";

export const GameImageLoadingState = () => (
  <div className="flex items-center justify-center bg-accent py-10">
    <Card className="w-full max-w-5xl">
      <CardContent className="p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-muted-foreground">Loading game...</p>
        </div>
      </CardContent>
    </Card>
  </div>
);
