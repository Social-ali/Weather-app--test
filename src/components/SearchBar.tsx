import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex gap-3 w-full max-w-2xl mx-auto mb-8 animate-slide-in"
      data-testid="search-form"
    >
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 h-14 text-lg bg-card/80 backdrop-blur-lg border-2 border-border focus-visible:ring-primary"
        data-testid="search-input"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="lg"
        className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        disabled={isLoading}
        data-testid="search-button"
      >
        <Search className="w-5 h-5 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
