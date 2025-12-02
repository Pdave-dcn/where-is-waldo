import { Card, CardContent } from "../ui/card";

interface ErrorStateProps {
  title: string;
  message: string;
}

export const GameImageErrorState = ({ title, message }: ErrorStateProps) => (
  <div className="flex items-center justify-center bg-accent py-10">
    <Card className="w-full max-w-5xl">
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  </div>
);
