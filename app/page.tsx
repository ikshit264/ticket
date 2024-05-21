import Image from "next/image";
import TicketCard from "./(components)/TicketCard";
import ClickTracker from "./(components)/ButtonFile";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <TicketCard/>
      {/* <ClickTracker/> */}
    </main>
  );
}
