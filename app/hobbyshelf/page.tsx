import { getHobby } from "@/lib/api";
import UniversalShelf from "@/components/shelves/UniversalShelf";
import { shelfConfigs } from "@/config/shelves";
export default async function HobbiesPage() {
    const hobbies = await getHobby();
    return <UniversalShelf config={shelfConfigs.hobby} items={hobbies} />;
}
