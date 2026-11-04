import { sectionRoute } from "@/components/SectionRoute";

const route = sectionRoute("/solution");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
