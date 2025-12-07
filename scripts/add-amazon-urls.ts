import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Amazon URLs for each book
const bookAmazonUrls: Record<string, string> = {
    "48 Laws of Power": "https://www.amazon.in/48-Laws-Power-Robert-Greene/dp/0140280197",
    "Chip War": "https://www.amazon.in/Chip-War-Worlds-Critical-Technology/dp/1398504106",
    "Deep Work": "https://www.amazon.in/Deep-Work-Focused-Success-Distracted/dp/0349411905",
    "Don't Shut Up": "https://www.amazon.in/Dont-Shut-Up-Prakhar-Gupta/dp/9391019773",
    "Don't Take It Personal": "https://www.amazon.in/Dont-Take-Personally-Elayne-Savage/dp/1572242949",
    "Emotional Intelligence": "https://www.amazon.in/Emotional-Intelligence-Matter-More-Than/dp/0747528306",
    "Games People Play": "https://www.amazon.in/Games-People-Play-Psychology-Relationships/dp/0345410033",
    "How to Win Friends and Influence People": "https://www.amazon.in/How-Win-Friends-Influence-People/dp/0091906814",
    "12 Rules for Life": "https://www.amazon.in/12-Rules-Life-Antidote-Chaos/dp/0141988517",
    "The Rudest Book Ever": "https://www.amazon.in/Rudest-Book-Ever-Shwetabh-Gangwar/dp/0143442902",
    "Stillness is the Key": "https://www.amazon.in/Stillness-Key-Ryan-Holiday/dp/1788162064",
    "System Design Interview": "https://www.amazon.in/System-Design-Interview-insiders-Second/dp/B08CMF2CQF",
    "The 5 AM Club": "https://www.amazon.in/AM-Club-Your-Morning-Elevate/dp/9387944891",
    "The 7 Habits of Highly Effective People": "https://www.amazon.in/Habits-Highly-Effective-People-Powerful/dp/1982137274",
    "The Compound Effect": "https://www.amazon.in/Compound-Effect-Darren-Hardy/dp/159315724X",
    "The Definitive Book of Body Language": "https://www.amazon.in/Definitive-Book-Body-Language-Expressions/dp/0553804723",
    "The Happiness Hypothesis": "https://www.amazon.in/Happiness-Hypothesis-Finding-Modern-Ancient/dp/0099478897",
    "The Happiness Trap": "https://www.amazon.in/Happiness-Trap-Struggling-Start-Living/dp/1590305841",
    "The Let Them Theory": "https://www.amazon.in/Let-Them-Theory-Controlling-Happiness/dp/1401975089",
    "The Mountain Is You": "https://www.amazon.in/Mountain-You-Transforming-Self-Sabotage-Self-Mastery/dp/1949759229",
    "The Subtle Art of Not Giving a F*ck": "https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive/dp/0062457713",
    "The Way of the Superior Man": "https://www.amazon.in/Way-Superior-Man-Spiritual-Challenges/dp/1622038320",
    "Thinking, Fast and Slow": "https://www.amazon.in/Thinking-Fast-Slow-Daniel-Kahneman/dp/0141033576",
    "Who Will Cry When You Die?": "https://www.amazon.in/Who-Will-Cry-When-You/dp/8179921190",
    "Why We Sleep": "https://www.amazon.in/Why-We-Sleep-Science-Dreams/dp/0141983760",
    "You Are a Badass": "https://www.amazon.in/You-Are-Badass-Doubting-Greatness/dp/0762447699",
};

async function addAmazonUrls() {
    console.log("Adding Amazon URLs to books...");

    for (const [title, amazonUrl] of Object.entries(bookAmazonUrls)) {
        try {
            const updated = await prisma.book.updateMany({
                where: { title },
                data: { amazonUrl },
            });

            if (updated.count > 0) {
                console.log(`✓ Updated: ${title}`);
            } else {
                console.log(`✗ Not found: ${title}`);
            }
        } catch (error) {
            console.error(`Error updating ${title}:`, error);
        }
    }

    console.log("\nDone!");
}

addAmazonUrls()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
