import Sheet from '@/app/_components/Sheet';
import Hero from '@/app/_components/Hero';
/**
 * section 6-1-1
 */
type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}
