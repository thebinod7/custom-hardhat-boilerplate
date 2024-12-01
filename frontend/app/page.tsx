import { ConnectBtn } from "./components/ConnectWallet";
import Profile from "./components/Profile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mt-50 items-center justify-between p-24">
      <div>
        <ConnectBtn />
      </div>

      <Profile />
    </main>
  );
}
