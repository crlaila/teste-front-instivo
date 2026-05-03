import AddressForm from '@/components/address-form';
import Header from '@/components/header';
import RecordListAddress from '@/components/record-list-address';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          <AddressForm />
          <RecordListAddress />
        </div>
      </main>
    </div>
  );
}
