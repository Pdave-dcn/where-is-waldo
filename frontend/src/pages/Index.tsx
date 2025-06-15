import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Index = () => {
  return (
    <div className="flex flex-col gap-8 bg-accent">
      <Header />
      <main className="flex flex-col items-center gap-8 px-5">
        <Card className="w-[10rem] flex items-center">
          <CardContent>
            <div className="flex gap-4 items-center">
              <Clock size={20} />
              <span className="text-2xl font-bold">0:00</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-center items-center w-full max-w-6xl mx-auto">
          <CardContent className="text-center py-10">
            <div className="mb-5">
              <h1 className="text-xl sm:text-3xl font-medium mb-2">
                Ready to Find Waldo?
              </h1>
              <p className="text-muted-foreground">
                Click on Waldo when you spot him in the crowd!
              </p>
            </div>
            <Button className="self-center">Start game</Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
