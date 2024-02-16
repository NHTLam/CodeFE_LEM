import Footer from "@/components/ComponentsLandingPage/Footer";
import Header from "@/components/ComponentsLandingPage/Header";
import Lines from "@/components/Lines";

export default function LandingPageLayout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <Lines />
            <Header />
                {children}
            <Footer />
        </>
    );
}