import Providers from "./providers";

export const metadata = {
  title: "Soundy",
  description: "Ambient sound app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}
