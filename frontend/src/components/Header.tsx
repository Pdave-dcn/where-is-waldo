const Header = () => {
  return (
    <header className="bg-primary flex flex-col justify-center items-center py-8 text-primary-foreground">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-2">WHERE'S WALDO?</h1>
        <p className="sm:text-lg">The ultimate search and find challenge!</p>
      </div>
    </header>
  );
};

export default Header;
