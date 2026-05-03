import AddressForm from '@/components/address-form';
import Header from '@/components/header';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container flex items-center gap-4 w-7xl mx-auto mt-10">
        <AddressForm />
      </div>
    </div>
  );
}
