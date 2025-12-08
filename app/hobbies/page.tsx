import { getHobbies } from "@/lib/api";
import UniversalShelf from "@/components/shelves/UniversalShelf";
import { shelfConfigs } from "@/config/shelves";

export default async function HobbiesPage() {
    const hobbies = await getHobbies();
    return <UniversalShelf config={shelfConfigs.hobbies} items={hobbies} />;
}
