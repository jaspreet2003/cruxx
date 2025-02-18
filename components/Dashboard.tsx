"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CryptoChart from "@/components/ui/CryptoChart";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DashboardProps {
  provider: any; // Define provider prop
  account: string | null; // Define account prop
}

interface Crypto {
  id: string;
  symbol: string;
  name: string;
}

export function Dashboard() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);

  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [timeRange, setTimeRange] = useState("30");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null); // Initialize as null or number
  const [livePriceAvailable, setLivePriceAvailable] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState<any[]>([]); // Adjust type according to your data structure

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        const formattedCryptos = response.data.map((crypto: any) => ({
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
        }));
        setCryptos(formattedCryptos);
        setFilteredCryptos(formattedCryptos); // Initialize filteredCryptos with all cryptos
      } catch (error: any) {
        console.error("Error fetching cryptos:", error);
      }
    };

    fetchCryptos();
  }, []);

  const fetchCurrentPrice = async () => {
    try {
      const response = await axios.get(`/api/coingecko/simple/price`, {
        params: {
          ids: selectedCrypto,
          vs_currencies: "usd",
        },
      });
      setCurrentPrice(response.data[selectedCrypto]?.usd || null); // Handle null case
    } catch (error: any) {
      console.error("Error fetching current price:", error);
      if (error.response && error.response.status === 429) {
        alert("Too many requests. Kindly retry in 1 minute."); // Show alert instead of Toaster
      } else {
        alert("Error fetching current price. Please refresh after 60 seconds."); // Show alert for other errors
      }
    }
  };

  const handleCryptoSelection = async (cryptoId: string) => {
    setSelectedCrypto(cryptoId);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/coingecko/coins/${cryptoId}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: timeRange,
          },
        }
      );
      setHistoricalData(response.data.prices);
      setFetchError(""); // Clear any previous error
      setIsLoading(false);
    } catch (error: any) {
      console.error(`Error fetching historical data for ${cryptoId}:`, error);
      setFetchError(
        "Too many requests for the free API to handle. Please refresh in a minute. 🥺"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCrypto) {
      fetchCurrentPrice();
    }
  }, [selectedCrypto]);

  useEffect(() => {
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchTerm, cryptos]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">CryptoPulse</span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8"
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 overflow-y-auto max-h-[calc(100vh-100px)] no-scrollbar">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <div className="border-b my-2"></div>
              {filteredCryptos.map((crypto: Crypto) => (
                <Link
                  key={crypto.id}
                  href="#"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    selectedCrypto === crypto.id ? "bg-muted text-primary" : ""
                  }`}
                  onClick={() => handleCryptoSelection(crypto.id)}
                >
                  {crypto.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-2 text-lg font-medium overflow-y-auto max-h-[calc(100vh-60px)] no-scrollbar">
                <Link
                  href="#"

                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                {filteredCryptos.map((crypto) => (
                  <Link
                    key={crypto.id}
                    href="#"
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      selectedCrypto === crypto.id ? "bg-muted text-primary" : ""
                    }`}
                    onClick={() => handleCryptoSelection(crypto.id)}
                  >
                    {crypto.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 relative">
            <form>
              {/* searching crypto currencies */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cryptocurrencies..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <ul className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {filteredCryptos.map((crypto) => (
                      <li
                        key={crypto.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCryptoSelection(crypto.id)}
                      >
                        {crypto.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center gap-4 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Time Range (
                  {timeRange === "1"
                    ? "1 Day"
                    : timeRange === "7"
                    ? "1 Week"
                    : "1 Month"}
                  )
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setTimeRange("1")}>
                  1 Day
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTimeRange("7")}>
                  1 Week
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTimeRange("30")}>
                  1 Month
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl capitalize">
              {selectedCrypto}
              {currentPrice !== null && (
                <span className="ml-2 text-sm text-gray-500">
                  (${currentPrice.toFixed(2)})
                </span>
              )}
            </h1>
            <Badge className="ml-4">
              {livePriceAvailable
                ? "Live Prices Available"
                : "Live Prices Not Available"}
            </Badge>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm w-full h-full lg:h-auto"
            x-chunk="dashboard-02-chunk-1"
          >
            {isLoading ? (
              <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : fetchError ? (
              <div className="text-red-500">{fetchError}</div>
            ) : (
              <CryptoChart
                selectedCrypto={selectedCrypto}
                timeRange={timeRange}
                setLivePriceAvailable={setLivePriceAvailable}
                setCurrentPrice={setCurrentPrice}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
