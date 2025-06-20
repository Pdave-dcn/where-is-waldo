import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Oops! Page not found</p>
        <Link to="/" className="text-muted-foreground underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
