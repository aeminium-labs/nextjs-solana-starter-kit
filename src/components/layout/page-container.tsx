type Props = {
  children: React.ReactNode;
};
export function PageContainer({ children }: Props) {
  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">{children}</div>
  );
}
