type Props = {
  children: React.ReactNode;
};

export function PageContainer({ children }: Props) {
  return (
    <div className="drawer-content flex flex-col">
      <div className="container min-h-screen grid grid-rows-[auto,1fr,auto] mx-auto max-w-6xl p-8 2xl:px-0">
        {children}
      </div>
    </div>
  );
}
