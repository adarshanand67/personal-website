

import { AnimeType, WatchStatus } from "@/types/definitions";

export const animeData = [
    {
        title: "Pokémon",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-20",
        image: "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
        description: "Ash Ketchum and his partner Pikachu travel the world to become the greatest Pokémon Master.",
        tags: ["Adventure", "Fantasy"],
        year: "1997",
        rating: "7.5/10",
        keyLearnings: [
            "True growth comes from the journey and the bonds formed, not just the championship title.",
            "Pikachu, I choose you! The strongest bond is one built on mutual respect."
        ]
    },
    {
        title: "Dragon Ball Z",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-9",
        image: "https://cdn.myanimelist.net/images/anime/1277/142022l.jpg",
        description: "Goku and his friends defend Earth from intergalactic threats including Saiyans, Androids, and magical creatures.",
        tags: ["Action"],
        year: "1989",
        rating: "8.8/10",
        keyLearnings: [
            "Pushing past your limits is a continuous process fueled by the desire to protect those you love.",
            "It's over 9000! Excellence is about constantly breaking your own ceiling."
        ]
    },
    {
        title: "Naruto",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-5",
        image: "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
        description: "A young ninja seeks recognition from his peers and dreams of becoming the Hokage.",
        tags: ["Action"],
        year: "2002",
        rating: "8.3/10",
        keyLearnings: [
            "Loneliness can be transformed into strength when you find a path to serve others.",
            "Believe it! I never go back on my word—that is my ninja way."
        ]
    },
    {
        title: "Death Note",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
        recommended: true,
        description: "A high school student discovers a supernatural notebook that grants him the ability to kill anyone.",
        tags: ["Supernatural", "Thriller"],
        year: "2006",
        rating: "9.0/10",
        keyLearnings: [
            "The absolute power to enforce justice inevitably corrupts the individual's morality.",
            "I'll take a potato chip... and EAT IT! High stakes require extreme focus and a bit of theatricality."
        ]
    },
    {
        title: "One Punch Man",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
        description: "A hero who can defeat any opponent with a single punch seeks a worthy challenge.",
        tags: ["Action", "Comedy"],
        year: "2015",
        rating: "8.7/10",
        keyLearnings: [
            "Being the strongest can lead to existential boredom; true fulfillment comes from the struggle.",
            "100 pushups, 100 situps, 100 squats, and a 10km run every single day!"
        ]
    },
    {
        title: "Haikyuu!! Series",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/1665/140360l.jpg",
        recommended: true,
        description: "The complete journey of Karasuno High School's volleyball team, from reviving the club to the legendary showdowns at the nationals.",
        tags: ["Sports", "Drama", "Slice of Life", "Action"],
        year: "2014",
        rating: "8.9/10",
        keyLearnings: [
            "Individual talent is limited, but a team that connects can overcome the tallest of walls.",
            "The ball hasn't touched the court yet! Never give up until the very last whistle."
        ]
    },
    {
        title: "Code Geass: Lelouch of Rebellion",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1032/135088l.jpg",
        recommended: true,
        description: "An exiled prince gains the power of absolute obedience and leads a rebellion.",
        tags: ["Sci-Fi", "Thriller"],
        year: "2006",
        rating: "8.7/10",
        keyLearnings: [
            "Major change requires sacrifice and the courage to take on the world's hatred.",
            "If the king doesn't move, then his subjects won't follow."
        ]
    },
    {
        title: "Cowboy Bebop",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
        description: "A crew of bounty hunters travels the solar system chasing criminals.",
        tags: ["Sci-Fi"],
        year: "1998",
        rating: "8.9/10",
        keyLearnings: [
            "You can't run from your past forever; eventually, you have to face it to find peace.",
            "See you space cowboy... Life is but a dream."
        ]
    },
    {
        title: "Steins;Gate Series",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1935/127974l.jpg",
        description: "A group of friends invent a time machine and must navigate through multiple worldlines to prevent a dystopian future and save their loved ones.",
        tags: ["Sci-Fi", "Thriller", "Psychological", "Drama"],
        year: "2011",
        rating: "9.1/10",
        keyLearnings: [
            "The weight of a single choice can ripple across time, making the present moment precious.",
            "El Psy Kongroo. No one knows what the future holds, that's why its potential is infinite."
        ]
    },
    {
        title: "Mob Psycho 100",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/8/80356l.jpg",
        description: "A powerful psychic tries to live a normal life while suppressing his emotions.",
        tags: ["Action", "Comedy", "Supernatural"],
        year: "2016",
        rating: "8.6/10",
        keyLearnings: [
            "Psychic powers don't make you a better person; kindness and self-improvement define your value.",
            "If everyone is special, maybe you can be what you want to be."
        ]
    },
    {
        title: "Jujutsu Kaisen Series",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
        description: "Yuji Itadori joins the Jujutsu sorcerers to fight against powerful curses and find the fingers of Sukuna, the King of Curses.",
        tags: ["Action", "Supernatural", "Fantasy", "Horror"],
        year: "2020",
        rating: "8.7/10",
        keyLearnings: [
            "Death is inevitable, so focus on giving people a 'proper death' and living with no regrets.",
            "Domain Expansion. In the heat of battle, one must reclaim their inner territory."
        ]
    },
    {
        title: "Blue Lock",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/1258/126929l.jpg",
        description: "A controversial project to create the world's greatest egoist striker.",
        tags: ["Sports", "Thriller"],
        year: "2022",
        rating: "8.3/10",
        keyLearnings: [
            "In competitive fields, overwhelming 'egoism' and self-belief are necessary to reach the top.",
            "LUK-EE! Success is where preparation meets the most intense desire to score."
        ]
    },
    {
        title: "Solo Leveling",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1801/142390l.jpg",
        recommended: true,
        description: "The weakest hunter in the world gains the unique ability to level up.",
        tags: ["Action", "Adventure", "Fantasy"],
        year: "2024",
        rating: "8.5/10",
        keyLearnings: [
            "Success is a solitary climb where one must constantly outdo their past self to survive.",
            "Arise. Your greatest shadow is often the power you haven't yet mastered."
        ]
    },
    {
        title: "Demon Slayer",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-5",
        image: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
        description: "A young man becomes a demon slayer to avenge his family and cure his sister, Tanjirou Kamado's journey through the ranks of the Demon Slayer Corps.",
        tags: ["Action", "Fantasy", "Supernatural", "Adventure"],
        year: "2019",
        rating: "9/10",
        keyLearnings: [
            "Empathy remains a warrior's greatest strength even when facing the cruelest of enemies.",
            "Set your heart ablaze. Go beyond your limits to protect those who cannot protect themselves."
        ]
    },
    {
        title: "Demon Slayer: Mugen Train",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "Movie",
        image: "https://cdn.myanimelist.net/images/anime/1704/106947l.jpg",
        description: "Tanjiro and his friends board the Mugen Train to investigate demon attacks. They team up with the Flame Hashira, Kyojuro Rengoku, to face the demon Enmu.",
        tags: ["Action", "Fantasy", "Supernatural", "Adventure"],
        year: "2020",
        rating: "8.8/10",
        keyLearnings: [
            "A person's legacy is defined by their conviction and the inspiration they leave for others.",
            "However many people you may lose, you have no choice but to go on living."
        ]
    },
    {
        title: "Tokyo Ghoul",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",
        description: "A college student becomes a half-ghoul and must navigate the world of flesh-eating monsters.",
        tags: ["Action", "Horror", "Supernatural"],
        year: "2014",
        rating: "7.8/10",
        keyLearnings: [
            "The world isn't wrong; it's the people within it who must choose how to survive.",
            "What's 1000 minus 7? Pain can be the catalyst for a terrifying transformation."
        ]
    },
    {
        title: "Aoashi",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1731/120871l.jpg",
        description: "A talented young soccer player is recruited for a professional youth team.",
        tags: ["Drama", "Sports"],
        year: "2022",
        rating: "8.1/10",
        keyLearnings: [
            "Technical skill is useless without 'bird's eye' vision and thinking three steps ahead.",
            "Control the field. Soccer is about more than just the ball; it's about the space around it."
        ]
    },
    {
        title: "Chainsaw Man",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
        description: "A young man merges with his pet devil to become a chainsaw-wielding devil hunter.",
        tags: ["Action", "Fantasy", "Horror"],
        year: "2022",
        rating: "8.5/10",
        keyLearnings: [
            "Even the simplest desires are worth fighting for in a world filled with chaos.",
            "Everyone's chasing some big dream. I just want a piece of toast with jam."
        ]
    },
    {
        title: "Erased",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/10/77957l.jpg",
        description: "A man travels back in time to his childhood to prevent a series of murders.",
        tags: ["Mystery", "Supernatural", "Thriller"],
        year: "2016",
        rating: "8.5/10",
        keyLearnings: [
            "Courage is the spark that can change a tragic past into a hopeful future for others.",
            "The town without me. Sometimes heroes are the ones who dare to step into the cold."
        ]
    },
    {
        title: "Dr Stone",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/1613/102576l.jpg",
        description: "A genius boy wakes up thousands of years after humanity was petrified.",
        tags: ["Adventure", "Sci-Fi", "Thriller"],
        year: "2019",
        rating: "8.3/10",
        keyLearnings: [
            "Science is the ultimate equalizer, capable of rebuilding civilization through logic.",
            "This is exhilarating! In a world of stone, the power of steady progress is absolute."
        ]
    },
    {
        title: "Vinland Saga",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1500/103005l.jpg",
        description: "A young Viking warrior seeks revenge against his father's killer while caught in a war for the English throne.",
        tags: ["Action", "Drama", "Historical"],
        year: "2019",
        rating: "8.8/10",
        keyLearnings: [
            "The most difficult battle is the internal journey toward becoming a truly kind person.",
            "I have no enemies. No one is born with the right to take another's life."
        ]
    },
    {
        title: "Attack on Titan",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
        description: "Humanity fights for survival against man-eating giants safe within massive walls.",
        tags: ["Action", "Fantasy"],
        year: "2013",
        rating: "9.0/10",
        keyLearnings: [
            "Freedom is a cruel and beautiful thing that requires the strength to keep moving forward.",
            "Tatakae! If you don't fight, you can't win. If you win, you live."
        ]
    },
    {
        title: "Fullmetal Alchemist Brotherhood",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1208/94745l.jpg",
        description: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed alchemical experiment.",
        tags: ["Adventure", "Fantasy"],
        year: "2009",
        rating: "9.1/10",
        keyLearnings: [
            "To obtain something, something of equal value must be lost; human connection transcends this.",
            "Equivalent Exchange. A heart made fullmetal can endure any trial."
        ]
    },
    {
        title: "Hunter x Hunter",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1305/132237l.jpg",
        description: "A young boy sets out to become a Hunter to find his father, facing dangerous trials along the way.",
        tags: ["Action", "Adventure", "Fantasy"],
        year: "2011",
        rating: "9.0/10",
        keyLearnings: [
            "The thrill of the hunt lies in the unexpected encounters and the bonds forged in battle.",
            "You should enjoy the little detours to the fullest. That's where you'll find what's important."
        ]
    },
    {
        title: "JoJo's Bizarre Adventure",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-6",
        image: "https://cdn.myanimelist.net/images/anime/3/40409l.jpg",
        description: "The Joestar family battles supernatural foes across generations using unique powers.",
        tags: ["Action", "Adventure", "Supernatural"],
        year: "2012",
        rating: "8.1/10",
        keyLearnings: [
            "Resilience across generations is the true testament to a family's legacy and spirit.",
            "Yare yare daze. Sometimes the most bizarre paths lead to the most definitive growth."
        ]
    },
    {
        title: "My Hero Academia",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-8",
        image: "https://cdn.myanimelist.net/images/anime/10/78745l.jpg",
        description: "A powerless boy inherits the power of the world's greatest hero and attends a high school for heroes.",
        tags: ["Action", "Slice of Life"],
        year: "2016",
        rating: "7.9/10",
        keyLearnings: [
            "Being a hero is about the instinct to help others when your body moves on its own.",
            "Plus Ultra! Go beyond your perceived limits even when the world tells you otherwise."
        ]
    },
    {
        title: "Bleach",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-17",
        image: "https://cdn.myanimelist.net/images/anime/1541/147774l.jpg",
        description: "A teenager gains the powers of a Soul Reaper and protects the living from evil spirits.",
        tags: ["Action", "Adventure", "Supernatural"],
        year: "2004",
        rating: "8.2/10",
        keyLearnings: [
            "True strength is found in the resolve to protect your home and your soul's identity.",
            "If I don't wield a sword, I can't protect you. If I keep wielding a sword, I can't embrace you."
        ]
    },
    {
        title: "Kaiju No 8",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1370/140362l.jpg",
        description: "A man who cleans up after monster battles gains the power to turn into a Kaiju himself.",
        tags: ["Action", "Fantasy", "Sci-Fi"],
        year: "2024",
        rating: "8.2/10",
        keyLearnings: [
            "Age is just a number when it comes to fulfilling a childhood promise.",
            "I'll stand by your side. Even in the face of despair, the choice to fight defines you."
        ]
    },
    {
        title: "One Piece",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-21",
        image: "https://cdn.myanimelist.net/images/anime/1770/97704l.jpg",
        description: "A rubber-bodied pirate and his crew search for the ultimate treasure to become the Pirate King.",
        tags: ["Action", "Adventure", "Fantasy"],
        year: "1999",
        rating: "9.0/10",
        keyLearnings: [
            "Inherited will and the dreams of people can never be stopped as long as there is freedom.",
            "I'm gonna be the Pirate King! The One Piece is real!"
        ]
    },
    {
        title: "Fairy Tail",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-9",
        image: "https://cdn.myanimelist.net/images/anime/5/18179l.jpg",
        description: "A wizard joins a famous guild and goes on adventures with her new friends.",
        tags: ["Adventure", "Fantasy"],
        year: "2009",
        rating: "7.6/10",
        keyLearnings: [
            "A guild is a family where your comrades' pain is your own.",
            "Because we're Fairy Tail! The power of friendship is an actual, unyielding force."
        ]
    },
    {
        title: "Sword Art Online",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/11/39717l.jpg",
        description: "Players are trapped in a VRMMORPG where dying in the game means dying in real life.",
        tags: ["Action", "Fantasy", "Sci-Fi"],
        year: "2012",
        rating: "7.2/10",
        keyLearnings: [
            "Virtual experiences can carry real-world weight and forge genuine human connections.",
            "This might be a game, but it's not something you play. It's somewhere you live."
        ]
    },
    {
        title: "Frieren: Beyond Journey’s End",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
        description: "An elf mage reflects on her long life and the meaning of human connections after her party's journey ends.",
        tags: ["Adventure", "Fantasy", "Slice of Life"],
        year: "2023",
        rating: "9.1/10",
        keyLearnings: [
            "Time moves differently for everyone; cherish brief moments shared with those who fade.",
            "It's a nuisance, really... but I'm glad I met them. The journey only begins after it ends."
        ]
    },
    {
        title: "Black Clover",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/2/88336l.jpg",
        description: "A boy with no magic strives to become the Wizard King in a world where magic is everything.",
        tags: ["Action", "Fantasy"],
        year: "2017",
        rating: "8.2/10",
        keyLearnings: [
            "Grit and persistence can bridge the gap between being 'nothing' and becoming a king.",
            "My magic is never giving up! Limitations are just obstacles to be shouted down."
        ]
    },
    {
        title: "Black Clover: Sword of the Wizard King",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1337/136363l.jpg",
        description: "Asta faces a returned Wizard King who aims to destroy the Clover Kingdom.",
        tags: ["Action", "Fantasy"],
        year: "2023",
        rating: "7.7/10",
        keyLearnings: [
            "The title of Wizard King is earned through action and the will to protect everyone.",
            "I'll show you that even without magic, I can reach the top."
        ]
    },
    {
        title: "Spy x Family",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/1441/122795l.jpg",
        description: "A spy, an assassin, and a telepath form a fake family to uphold world peace.",
        tags: ["Action", "Comedy", "Slice of Life"],
        year: "2022",
        rating: "8.5/10",
        keyLearnings: [
            "A family doesn't need to be biologically related to provide unconditional love.",
            "Waku Waku! Secrets can be the glue that holds a makeshift family together."
        ]
    },
    {
        title: "Berserk",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/10/79352l.jpg",
        description: "A wandering mercenary joins a charismatic leader's band, leading to a dark and tragic fate.",
        tags: ["Action", "Fantasy", "Horror"],
        year: "1997",
        rating: "8.5/10",
        keyLearnings: [
            "Humanity is defined by the struggle against destiny and the darkness in our hearts.",
            "GRIFFITH! Even in a nightmare world, the will to survive can keep a man standing."
        ]
    },
    {
        title: "Kuroko No Basket",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/11/50453l.jpg",
        description: "A shadow player helps a new light defeat his former teammates, the Generation of Miracles.",
        tags: ["Slice of Life", "Sports"],
        year: "2012",
        rating: "8.4/10",
        keyLearnings: [
            "The greatest support allows others to shine while remaining invisible yet indispensable.",
            "I am a shadow. The stronger the light, the darker the shadow."
        ]
    },


    {
        title: "Made in Abyss",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/6/86733l.jpg",
        description: "A girl and a robot boy explore a mysterious, deadly chasm to find her mother.",
        tags: ["Adventure", "Fantasy", "Mystery"],
        year: "2017",
        rating: "8.7/10",
        keyLearnings: [
            "Curiosity for the unknown is a double-edged sword that brings both wonder and loss.",
            "Subarashii. The abyss calls to those who are willing to lose everything for the truth."
        ]
    },
    {
        title: "Ping Pong the Animation",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1586/146565l.jpg",
        description: "Two friends with different attitudes toward ping pong navigate high school competition.",
        tags: ["Drama", "Sports", "Thriller"],
        year: "2014",
        rating: "8.6/10",
        keyLearnings: [
            "Talent is a burden, but rediscovering the pure joy of the game is the ultimate victory.",
            "The hero appears. Ping pong is more than just a sport; it's a reflection of the soul."
        ]
    },

    {
        title: "The Seven Deadly Sins",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-5",
        image: "https://cdn.myanimelist.net/images/anime/8/65409l.jpg",
        description: "A princess seeks a group of disbanded knights to help her take back her kingdom.",
        tags: ["Action", "Adventure", "Fantasy"],
        year: "2014",
        rating: "7.7/10",
        keyLearnings: [
            "Sins of the past can be redeemed through loyalty and facing one's own darkness.",
            "Full Counter! Love is the strongest curse and the greatest salvation."
        ]
    },
    {
        title: "Hell's Paradise",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1075/131925l.jpg",
        description: "Criminals and executioners are sent to a mysterious island to find the elixir of life.",
        tags: ["Action", "Fantasy", "Historical"],
        year: "2023",
        rating: "8.0/10",
        keyLearnings: [
            "Human emotions are the strongest anchor even for those who claim to have lost their hearts.",
            "Gabimaru the Hollow. To live for someone else is the highest form of strength."
        ]
    },
    {
        title: "Summer Time Rendering",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1120/120796l.jpg",
        description: "A young man returns to his island home and uncovers a mystery involving dopplegangers.",
        tags: ["Mystery", "Supernatural", "Thriller"],
        year: "2022",
        rating: "8.5/10",
        keyLearnings: [
            "Memory and observation are the keys to overcoming a recurring nightmare.",
            "Observe. The truth is often hidden in the shadows of what we choose to see."
        ]
    },
    {
        title: "To Your Eternity",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1880/118484l.jpg",
        description: "An immortal entity takes on various forms and learns what it means to be human.",
        tags: ["Adventure", "Drama", "Supernatural"],
        year: "2021",
        rating: "8.4/10",
        keyLearnings: [
            "The pain of loss is the proof of a life well-lived and the legacy of others.",
            "It's a stimulus. To be immortal is to witness the beauty of ending."
        ]
    },
    {
        title: "Neon Genesis Evangelion",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1314/108941l.jpg",
        description: "Teenagers pilot giant bio-machines to fight mysterious entities known as Angels.",
        tags: ["Sci-Fi", "Thriller"],
        year: "1995",
        rating: "8.5/10",
        keyLearnings: [
            "Escaping into oneself leads to isolation; maturity is accepting the pain of connecting.",
            "Get in the robot, Shinji. Choosing to exist is the first step toward healing."
        ]
    },
    {
        title: "Gurren Lagann",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/4/5123l.jpg",
        description: "Two friends emerge from an underground village to fight beastmen in giant robots.",
        tags: ["Action", "Adventure", "Sci-Fi"],
        year: "2007",
        rating: "8.6/10",
        keyLearnings: [
            "Evolution is fueled by the spirit to pierce through any ceiling and reach for the stars.",
            "Believe in the me that believes in you! Your drill is the drill that will pierce the heavens!"
        ]
    },
    {
        title: "Parasyte: The Maxim",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/3/73178l.jpg",
        description: "A teenager coexists with an alien parasite that took over his right hand.",
        tags: ["Horror", "Sci-Fi", "Thriller"],
        year: "2014",
        rating: "8.3/10",
        keyLearnings: [
            "The definition of 'humanity' is blurred when survival forces us to see through another's eyes.",
            "Migi, handle the defense. Life is a series of rational decisions in an irrational world."
        ]
    },

    {
        title: "Fate/Zero",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1887/117644l.jpg",
        description: "Seven mages summon heroic spirits to fight in a battle royale for the Holy Grail.",
        tags: ["Action", "Fantasy", "Supernatural"],
        year: "2011",
        rating: "8.3/10",
        keyLearnings: [
            "Ideals without realistic foundations can lead to tragedy, regardless of nobility.",
            "The Holy Grail is cursed. True heroism is often found in the darkest choices."
        ]
    },
    {
        title: "Violet Evergarden",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1795/95088l.jpg",
        description: "A former soldier works as a ghostwriter to understand the meaning of love and emotions.",
        tags: ["Drama", "Fantasy", "Slice of Life"],
        year: "2018",
        rating: "8.7/10",
        keyLearnings: [
            "Words have the power to bridge the gap between hearts and heal wounds of war.",
            "I want to know what 'I love you' means. Letters carry the weight of a soul."
        ]
    },
    {
        title: "Your lie in April",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1405/143284l.jpg",
        description: "A piano prodigy who lost his ability to play meets a violinist who brings color back to his life.",
        tags: ["Drama", "Music", "Romance"],
        year: "2014",
        rating: "8.6/10",
        keyLearnings: [
            "A single person can change your worldview and leave a melody that never fades.",
            "Did it reach her? Spring will come, and it will be a spring without you."
        ]
    },
    {
        title: "Hyouka",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/13/50521l.jpg",
        description: "High school students solve mundane mysteries in their Classic Literature Club.",
        tags: ["Mystery", "Slice of Life"],
        year: "2012",
        rating: "8.1/10",
        keyLearnings: [
            "Even mundane mysteries provide profound understanding of human nature.",
            "I'm curious! If you don't have to do it, don't. If you have to, do it quickly."
        ]
    },
    {
        title: "Prison School",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1286/112161l.jpg",
        description: "Five boys enrolled in an all-girls school are imprisoned after peeping.",
        tags: ["Comedy", "Slice of Life"],
        year: "2015",
        rating: "7.6/10",
        keyLearnings: [
            "In extreme adversity, brotherhood and loyalty take precedence over social conventions.",
            "Gakuto! A man's dignity is found in his willingness to sacrifice for his friends."
        ]
    },
    {
        title: "Grand Blue",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1302/94882l.jpg",
        description: "A college student joins a diving club that is mostly about drinking and partying.",
        tags: ["Comedy", "Slice of Life"],
        year: "2018",
        rating: "8.4/10",
        keyLearnings: [
            "College life is about diving into new experiences and making questionable but great memories.",
            "VODKA! Sometimes the best way to bond is to stop thinking and just dive in."
        ]
    },
    {
        title: "Monster",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1648/152231l.jpg",
        description: "A doctor hunts down a former patient who has become a serial killer.",
        tags: ["Mystery", "Thriller"],
        year: "2004",
        rating: "8.8/10",
        keyLearnings: [
            "Every life has equal value, but a single decision can lead to unforgivable consequences.",
            "If you're going to kill, you should be prepared to be killed yourself."
        ]
    },
    {
        title: "March comes in like a Lion",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/3/82899l.jpg",
        description: "A teen shogi player deals with loneliness and finding his place in the world.",
        tags: ["Drama", "Slice of Life"],
        year: "2016",
        rating: "8.4/10",
        keyLearnings: [
            "Finding one's place in the world is a slow process of accepting both kindness and pain.",
            "It's okay to rely on others; sometimes that's the only way to move forward."
        ]
    },
    {
        title: "Ghost in the Shell: Stand Alone Complex",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/3/85128l.jpg",
        description: "A cyborg police officer leads a special ops unit against cyber criminals.",
        tags: ["Sci-Fi", "Thriller"],
        year: "2002",
        rating: "8.5/10",
        keyLearnings: [
            "The boundary between man and machine is as thin as the data that defines our souls.",
            "What if there's no ghost in the engine? Identity is what you make of it."
        ]
    },
    {
        title: "The Promised Neverland",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1830/118780l.jpg",
        description: "Orphans discover their orphanage is a farm raising them as food for demons.",
        tags: ["Horror", "Mystery", "Thriller"],
        year: "2019",
        rating: "8.5/10",
        keyLearnings: [
            "Hope is the most powerful weapon against a world designed to consume you.",
            "We will escape together. Even in a farm of demons, our intelligence is our salvation."
        ]
    },
    {
        title: "Charlotte",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1826/147276l.jpg",
        description: "Teens with temporary superpowers are gathered to protect them from experimentation.",
        tags: ["Action", "Drama", "Slice of Life"],
        year: "2015",
        rating: "7.8/10",
        keyLearnings: [
            "The weight of responsibility can be overwhelming, but it's what gives life meaning.",
            "Even if I lose my memories, the feelings we shared will remain."
        ]
    },
    {
        title: "Rascal Does Not Dream of Bunny Girl Senpai",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1301/93586l.jpg",
        description: "A student solves 'Adolescence Syndrome' mysteries affecting girls around him.",
        tags: ["Romance", "Supernatural", "Thriller"],
        year: "2018",
        rating: "8.2/10",
        keyLearnings: [
            "Kindness and empathy are the best cures for the 'adolescence syndrome' of loneliness.",
            "I live my life based on whether I'll be proud of myself tomorrow."
        ]
    },
    {
        title: "Gintama",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-9",
        image: "https://cdn.myanimelist.net/images/anime/4/50361l.jpg",
        description: "A samurai works odd jobs in an Edo-period Japan conquered by aliens.",
        tags: ["Action", "Comedy", "Sci-Fi"],
        year: "2006",
        rating: "8.9/10",
        keyLearnings: [
            "True honor isn't about the era you live in, but the soul you keep.",
            "Zura janai, Katsura da! Life is more fun when you have friends to be stupid with."
        ]
    },
    {
        title: "Assassination Classroom",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/5/75639l.jpg",
        description: "Students must assassinate their alien teacher before he destroys the Earth.",
        tags: ["Action", "Comedy", "Slice of Life"],
        year: "2015",
        rating: "8.1/10",
        keyLearnings: [
            "Education is about teaching students how to live, not just how to kill.",
            "Nurufufufu! A teacher's job is to prepare you for the world outside the classroom."
        ]
    },
    {
        title: "Blue Eye Samurai",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/12/75545l.jpg",
        description: "A mixed-race master of the sword seeks revenge in Edo-period Japan.",
        tags: ["Action", "Drama", "Historical"],
        year: "2023",
        rating: "8.7/10",
        keyLearnings: [
            "Revenge is a cold path that requires a heart as sharp and unyielding as a blade.",
            "I'm not a samurai. I'm just a monster who knows how to use a sword."
        ]
    },
    {
        title: "Lycoris Recoil",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1261/127311l.jpg",
        description: "Girls work as secret agents protecting the peace of Tokyo while running a café.",
        tags: ["Action", "Slice of Life"],
        year: "2022",
        rating: "7.9/10",
        keyLearnings: [
            "Peace is maintained by those willing to do the dirty work in the shadows.",
            "Sakana! Even in a café, a secret agent must always be ready for action."
        ]
    },
    {
        title: "Hajime no Ippo",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/4/86334l.jpg",
        description: "A bullied boy discovers a talent for boxing and aims for the championship.",
        tags: ["Action", "Sports"],
        year: "2000",
        rating: "8.8/10",
        keyLearnings: [
            "Boxers don't fight to hit; they fight to find the meaning of strength.",
            "What does it mean to be strong? The answer is at the end of every punch."
        ]
    },
    {
        title: "I want to eat your pancreas",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1768/93291l.jpg",
        description: "A boy finds a diary of his classmate who is secretly dying from a pancreatic disease.",
        tags: ["Drama", "Romance", "Slice of Life"],
        year: "2018",
        rating: "8.6/10",
        keyLearnings: [
            "Living each day with no regrets is the most beautiful way to face the inevitable.",
            "To live is to have a bond with others. That's what it means to be alive."
        ]
    },
    {
        title: "Grave of Fireflies",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1485/141208l.jpg",
        description: "Two siblings struggle to survive in Japan during the final months of World War II.",
        tags: ["Action", "Drama", "Historical"],
        year: "1988",
        rating: "8.5/10",
        keyLearnings: [
            "War has no winners, only victims whose innocence is stolen by fire and hunger.",
            "Why do fireflies have to die so soon? A tragic reminder of the fragility of peace."
        ]
    },
    {
        title: "Spirited Away",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/6/79597l.jpg",
        description: "A young girl is trapped in a spirit world and must work to free her parents.",
        tags: ["Adventure", "Fantasy"],
        year: "2001",
        rating: "8.8/10",
        keyLearnings: [
            "Courage and hard work can break any spirit's curse or human's transformation.",
            "Don't forget your name. It's the only thing that keeps you who you are."
        ]
    },
    {
        title: "Your Name",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/5/87048l.jpg",
        description: "Two teenagers share a profound connection after discovering they are swapping bodies.",
        tags: ["Drama", "Romance", "Supernatural"],
        year: "2016",
        rating: "8.9/10",
        keyLearnings: [
            "The thread of fate can connect hearts across time and space if the bond is strong enough.",
            "I'm always searching for something, someone... Your Name is etched in my heart."
        ]
    },
    {
        title: "5 Centimeters Per Second",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1410/112994l.jpg",
        description: "A story of two friends drifting apart as they grow older.",
        tags: ["Drama", "Romance", "Slice of Life"],
        year: "2007",
        rating: "7.6/10",
        keyLearnings: [
            "Sometimes the most profound connections are the ones that drift apart silently.",
            "The speed at which 5 centimeters per second—that's how fast cherry blossoms fall."
        ]
    },
    {
        title: "Howl’s Moving Castle",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1470/138723l.jpg",
        description: "A cursed young woman seeks the help of a wizard in his walking castle.",
        tags: ["Adventure", "Fantasy", "Romance"],
        year: "2004",
        keyLearnings: [
            "True beauty is found in the heart, and love can break the oldest of curses.",
            "A heart is a heavy burden. But a moving castle needs a heart to walk."
        ]
    },
    {
        title: "Princess Mononoke",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1355/147277l.jpg",
        description: "A prince becomes involved in a struggle between forest gods and humans consuming nature.",
        tags: ["Action", "Adventure", "Fantasy"],
        year: "1997",
        rating: "8.7/10",
        keyLearnings: [
            "Nature doesn't need humans, but humans cannot survive without the forest's mercy.",
            "To see with eyes unclouded by hate. The struggle for balance is eternal."
        ]
    },
    {
        title: "Suzume",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1598/128450l.jpg",
        description: "A girl travels across Japan closing mysterious doors to prevent disasters.",
        tags: ["Adventure", "Fantasy"],
        year: "2022",
        rating: "8.3/10",
        keyLearnings: [
            "Closing the doors of the past is necessary to prevent the disasters of the future.",
            "I went to see my mother. The journey is about healing the scars of the land."
        ]
    },
    {
        title: "Weathering With You",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1880/101146l.jpg",
        description: "A runaway boy befriends a girl who can manipulate the weather.",
        tags: ["Drama", "Fantasy", "Romance"],
        year: "2019",
        rating: "8.3/10",
        keyLearnings: [
            "Even if the sky is gray, the choice to be together is what brings the sunshine.",
            "Who cares if we never see the sun again! I want you more than any blue sky."
        ]
    },
    {
        title: "A Silent Voice",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1122/96435l.jpg",
        description: "A former bully seeks redemption by reconnecting with the deaf girl he bullied.",
        tags: ["Drama", "Slice of Life"],
        year: "2016",
        rating: "8.9/10",
        keyLearnings: [
            "Redemption is a slow path of learning to hear the voice that you once silenced.",
            "I want to tell you... that I'm sorry. Forgiveness begins with self-forgiveness."
        ]
    },
    {
        title: "The Girl Who Leapt Through Time",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1/2432l.jpg",
        description: "A girl gains the ability to time travel and uses it to fix minor inconveniences.",
        tags: ["Drama", "Romance", "Sci-Fi"],
        year: "2006",
        rating: "7.8/10",
        keyLearnings: [
            "Time is precious; using it selfishly only leads to more complicated regrets.",
            "Time waits for no one. Cherish the present before it leaps away."
        ]
    },
    {
        title: "That Time I Got Reincarnated as a Slime",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1069/123309l.jpg",
        description: "A corporate worker is reborn as a powerful slime in a fantasy world.",
        tags: ["Fantasy"],
        year: "2022",
        rating: "7.6/10",
        keyLearnings: [
            "Being a leader means gathering a diverse group and turning them into a nation.",
            "I'm a slime, not an evil slime! Unity is the strongest magic there is."
        ]
    },
    {
        title: "The Eminence in Shadow",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "",
        image: "https://cdn.myanimelist.net/images/anime/1091/128729l.jpg",
        description: "A boy obsessed with being a mastermind in the shadows gets reincarnated.",
        tags: ["Action", "Comedy", "Fantasy"],
        year: "2022",
        rating: "7.7/10",
        keyLearnings: [
            "The most powerful Mastermind is the one who remains a myth in everyone's eyes.",
            "I am Atomic! To rule from the shadows, one must first master the art of roleplay."
        ]
    },
    {
        title: "Kaguya-sama: Love Is War",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/1295/106551l.jpg",
        description: "Two genius students try to force the other to confess their love first.",
        tags: ["Comedy", "Romance", "Slice of Life"],
        year: "2019",
        rating: "8.5/10",
        keyLearnings: [
            "Love is a psychological battlefield where the first one to blink loses their pride.",
            "O Kawaii Koto. Intelligence is useless when the heart is in a total state of war."
        ]
    },
    {
        title: "Re:Zero",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/1040/153636l.jpg",
        description: "A boy transported to a fantasy world gains the ability to rewind time upon death.",
        tags: ["Drama", "Fantasy", "Thriller"],
        year: "2016",
        rating: "8.2/10",
        keyLearnings: [
            "Return by Death is a curse that only the strongest will can transform into a salvation.",
            "I will save you! No matter how many times I have to die, I won't give up on you."
        ]
    },
    {
        title: "Dandadan",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1584/143719l.jpg",
        description: "Two students face off against spirits and aliens in high-speed occult battles.",
        tags: ["Action", "Comedy", "Supernatural"],
        year: "2024",
        rating: "8.6/10",
        keyLearnings: [
            "Supernatural threats are easier to face when you have a partner who shares your weirdness.",
            "Turbo Granny! The occult is terrifying, but high-speed battles are even wilder."
        ]
    },
    {
        title: "Mushoku Tensei: Jobless Reincarnation",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1530/117776l.jpg",
        description: "A jobless man is reincarnated in a fantasy world and vows to live his new life to the fullest.",
        tags: ["Adventure", "Fantasy"],
        year: "2021",
        rating: "8.4/10",
        keyLearnings: [
            "A second chance at life is a debt that must be paid by living with absolute conviction.",
            "I'll work hard so I won't ever have to regret anything again."
        ]
    },
    {
        title: "Cyberpunk: Edgerunners",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1818/126435l.jpg",
        description: "A street kid becomes an edgerunner in a tech-obsessed dystopian city.",
        tags: ["Action", "Sci-Fi"],
        year: "2022",
        rating: "8.6/10",
        keyLearnings: [
            "In a city that consumes everyone, the only thing that matters is the dream you leave behind.",
            "I'm going to the moon. Even a street kid can reach for the stars in Night City."
        ]
    },
    {
        title: "Clannad: After Story",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/13/24647l.jpg",
        description: "The story of adulthood, family, and loss following high school life.",
        tags: ["Drama", "Romance", "Slice of Life"],
        year: "2008",
        rating: "9.0/10",
        keyLearnings: [
            "The most painful losses are the ones that remind us how much we actually loved.",
            "Dango, dango, dango... Family is the most beautiful and tragic circle of life."
        ]
    },
    {
        title: "Oshi no Ko",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
        description: "A doctor is reborn as the child of an idol and enters the entertainment industry.",
        tags: ["Drama", "Mystery"],
        year: "2023",
        rating: "8.7/10",
        keyLearnings: [
            "The entertainment industry is a web of lies where the truth is the most dangerous idol.",
            "Liars are the best idols. But a mother's love is the only lie worth keeping."
        ]
    },
    {
        title: "86 (Eighty-Six)",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1987/117507.jpg",
        description: "Soldiers pilot drones in a war against autonomous machines, treated as non-humans.",
        tags: ["Sci-Fi"],
        year: "2021",
        rating: "8.2/10",
        keyLearnings: [
            "Humanity is defined by the dignity you maintain even when the world treats you as sub-human.",
            "Fido. We pilot these machines so we can die as humans, not as drones."
        ]
    },
    {
        title: "Bocchi the Rock!",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1448/127956.jpg",
        description: "A socially anxious girl joins a band and discovers the joy of performing.",
        tags: ["Comedy", "Music", "Slice of Life"],
        year: "2022",
        rating: "8.8/10",
        keyLearnings: [
            "Social anxiety can be managed when you find an instrument to speak your hidden soul.",
            "Bocchi-chan! Rock music is the voice of the introverts who want to scream."
        ]
    },
    {
        title: "Chihayafuru",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/3/35749.jpg",
        description: "A girl aims to become the queen of Karuta, a competitive card game.",
        tags: ["Drama", "Sports"],
        year: "2011",
        rating: "8.2/10",
        keyLearnings: [
            "A childhood dream can become a lifelong passion that connects people across time.",
            "I want to be the Queen of Karuta. The cards tell a story of effort and devotion."
        ]
    },
    {
        title: "Natsume's Book of Friends",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-7",
        image: "https://cdn.myanimelist.net/images/anime/1681/108439.jpg",
        description: "A boy who sees spirits returns their names to free them from a contract book.",
        tags: ["Slice of Life", "Supernatural"],
        year: "2008",
        rating: "8.3/10",
        keyLearnings: [
            "Kindness to those who are different is the best way to return the names of the past.",
            "Nyanko-sensei! Every encounter with a spirit is a lesson in human connection."
        ]
    },
    {
        title: "Bakemonogatari",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/11/75274.jpg",
        description: "A student helps girls dealing with supernatural afflictions ('oddities').",
        tags: ["Drama", "Mystery", "Supernatural"],
        year: "2009",
        rating: "8.3/10",
        keyLearnings: [
            "Words have weight, and the way we tell our stories defines the reality we live in.",
            "I bit my tongue! Reality is a dialogue between the observer and the observed."
        ]
    },
    {
        title: "Mushishi",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/2/73862.jpg",
        description: "A traveler investigates primeval lifeforms known as Mushi and their effects on people.",
        tags: ["Mystery", "Slice of Life", "Supernatural"],
        year: "2005",
        rating: "8.7/10",
        keyLearnings: [
            "Life in its simplest form is neither good nor evil; it just exists and affects us.",
            "Mushi are not monsters. They are just a different world overlapping with ours."
        ]
    },
    {
        title: "Great Teacher Onizuka",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/13/11460.jpg",
        description: "An ex-gangster becomes a teacher to reform a class of delinquents.",
        tags: ["Comedy", "Drama", "Slice of Life"],
        year: "1999",
        rating: "8.6/10",
        keyLearnings: [
            "To reach students who have given up, you must be a teacher who isn't afraid to be human.",
            "Great Teacher Onizuka! I'll teach you that life is more than just grades."
        ]
    },
    {
        title: "Yu Yu Hakusho",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1228/111372.jpg",
        description: "A delinquent dies saving a child and returns as a Spirit Detective.",
        tags: ["Action", "Sports", "Supernatural"],
        year: "1992",
        rating: "8.5/10",
        keyLearnings: [
            "Dying to save others is just the beginning of a duty that transcends the living world.",
            "Ray Gun! A delinquent's spirit is the strongest shield against the supernatural."
        ]
    },
    {
        title: "Rurouni Kenshin",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1346/119505.jpg",
        description: "A former assassin wanders Japan offering protection to atone for his past.",
        tags: ["Action", "Historical"],
        year: "1996",
        rating: "8.3/10",
        keyLearnings: [
            "A sword that protects is far heavier than a sword that only knows how to kill.",
            "Oro? A wanderer's path is to ensure that no one else has to suffer as I did."
        ]
    },
    {
        title: "Inuyasha",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1589/95329.jpg",
        description: "A modern girl travels to feudal Japan and searches for Jewel shards with a half-demon.",
        tags: ["Adventure", "Fantasy", "Romance"],
        year: "2000",
        rating: "7.9/10",
        keyLearnings: [
            "Love across ages and worlds is a journey of finding the pieces of one's own soul.",
            "Sit, boy! The strongest jewel is the one built on trust between two worlds."
        ]
    },
    {
        title: "Nana",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/2/11232.jpg",
        description: "Two women named Nana meet on a train and navigate life and love in Tokyo.",
        tags: ["Drama", "Music", "Romance"],
        year: "2006",
        rating: "8.5/10",
        keyLearnings: [
            "Two paths that cross in a big city can create a melody that echoes through a lifetime.",
            "Hey, Nana... Life is a song that we compose together, even if we drift apart."
        ]
    },
    {
        title: "Beck: Mongolian Chop Squad",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/11/11636.jpg",
        description: "A teenager discovers rock music and joins a band striving for fame.",
        tags: ["Drama", "Music", "Slice of Life"],
        year: "2004",
        rating: "8.3/10",
        keyLearnings: [
            "Music is the bridge between a boring life and a world filled with raw energy.",
            "Beck. The best band is the one where everyone is playing from their heart."
        ]
    },
    {
        title: "Black Lagoon",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/1906/121592.jpg",
        description: "A businessman is kidnapped by pirates and joins their crew in a lawless city.",
        tags: ["Action", "Drama", "Thriller"],
        year: "2006",
        rating: "8.1/10",
        keyLearnings: [
            "In a world where bullets are the only currency, survival is the highest form of rebellion.",
            "Amen, Hallelujah, Peanut Butter! In this city, you're either a pirate or a ghost."
        ]
    },
    {
        title: "Trigun",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1130/120002.jpg",
        description: "A pacifist gunman with a huge bounty travels a desert planet.",
        tags: ["Action", "Comedy", "Sci-Fi"],
        year: "1998",
        rating: "8.2/10",
        keyLearnings: [
            "Love and peace are expensive ideals in a world that only knows how to destroy.",
            "This world is made of Love and Peace! A pacifist gunman is the ultimate contradiction."
        ]
    },
    {
        title: "Hellsing Ultimate",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1012/143965.jpg",
        description: "A powerful vampire fights against supernatural threats for a British organization.",
        tags: ["Action", "Horror", "Supernatural"],
        year: "2006",
        rating: "8.3/10",
        keyLearnings: [
            "True monsters are often those who claim to be fighting for the light.",
            "Come on... Search and Destroy. A vampire's loyalty is the darkest of all."
        ]
    },
    {
        title: "Psycho-Pass",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/1314/142015.jpg",
        description: "Police enforce the Sibyl System, which measures mental state and crime potential.",
        tags: ["Sci-Fi", "Thriller"],
        year: "2012",
        rating: "8.3/10",
        keyLearnings: [
            "A system that judges criminals before they commit crimes is a system that kills the soul.",
            "The system is perfect. Justice is a luxury for those who can still think for themselves."
        ]
    },
    {
        title: "Darker than Black",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/5/19570.jpg",
        description: "Contractors with supernatural powers perform missions in a world with a fake sky.",
        tags: ["Action", "Mystery", "Sci-Fi"],
        year: "2007",
        rating: "8.1/10",
        keyLearnings: [
            "A contract with the supernatural always comes with a price paid in one's own humanity.",
            "Contracts are for the dead. Living is the hardest mission of all."
        ]
    },
    {
        title: "Durarara!!",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/10/71772.jpg",
        description: "The lives of unique characters intersect in Tokyo's Ikebukuro district.",
        tags: ["Action", "Fantasy", "Mystery"],
        year: "2010",
        rating: "8.2/10",
        keyLearnings: [
            "The most ordinary-looking people often have the most extraordinary secrets.",
            "Ikebukuro is a stage, and we're all just actors in a city that never sleeps."
        ]
    },
    {
        title: "Noragami",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1886/128266.jpg",
        description: "A minor god seeks followers and battles phantoms with his Regalia.",
        tags: ["Action", "Comedy", "Supernatural"],
        year: "2014",
        rating: "8.0/10",
        keyLearnings: [
            "A god without followers is just a ghost in a world that has forgotten how to pray.",
            "I'll do it for five yen! Even a minor god can make a major difference."
        ]
    },
    {
        title: "Soul Eater",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1071/149486.jpg",
        description: "Students at a weapon meister academy hunt souls to create a Death Scythe.",
        tags: ["Action", "Comedy", "Fantasy"],
        year: "2008",
        rating: "7.9/10",
        keyLearnings: [
            "Resonance of soul is far more powerful than any weapon or magic.",
            "A sound soul dwells within a sound mind and a sound body."
        ]
    },
    {
        title: "Akame ga Kill!",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1429/95946.jpg",
        description: "A fighter joins a group of assassins planning to overthrow a corrupt empire.",
        tags: ["Action", "Fantasy"],
        year: "2014",
        rating: "7.5/10",
        keyLearnings: [
            "In a corrupt empire, the choice to kill is the only way to save the future.",
            "Night Raid. We carry the burdens so that one day the world won't have to."
        ]
    },
    {
        title: "No Game No Life",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1074/111944.jpg",
        description: "Sibling gamers are transported to a world where everything is decided by games.",
        tags: ["Adventure", "Fantasy", "Sci-Fi"],
        year: "2014",
        rating: "8.1/10",
        keyLearnings: [
            "Games are a reflection of life where pure strategy can overcome any disadvantage.",
            "Blank never loses. In this world, the smartest gamers are the new gods."
        ]
    },
    {
        title: "KonoSuba",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/1895/142748.jpg",
        description: "A boy dies and forms a dysfunctional party in a fantasy world.",
        tags: ["Comedy", "Fantasy"],
        year: "2016",
        rating: "8.1/10",
        keyLearnings: [
            "Even in a world of magic, a dysfunctional party can find its own kind of victory.",
            "EXPLOSION! Sometimes the most useless skills are the ones that save the day."
        ]
    },
    {
        title: "Toradora!",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/13/22128.jpg",
        description: "Two students agree to help each other pursue their crushes.",
        tags: ["Comedy", "Romance", "Slice of Life"],
        year: "2008",
        rating: "8.3/10",
        keyLearnings: [
            "Persistence and hard work eventually lead to success.",
            "The importance of bonds and friendship in overcoming adversity."
        ]
    },
    {
        title: "Angel Beats!",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1244/111115.jpg",
        description: "Students in the afterlife fight against a girl named Angel.",
        tags: ["Action", "Comedy", "Drama"],
        year: "2010",
        rating: "8.1/10",
        keyLearnings: [
            "Persistence and hard work eventually lead to success.",
            "The importance of bonds and friendship in overcoming adversity."
        ]
    },
    {
        title: "Anohana: The Flower We Saw That Day",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/5/79697.jpg",
        description: "Friends reunite to grant the wish of their childhood friend's ghost.",
        tags: ["Drama", "Slice of Life", "Supernatural"],
        year: "2011",
        rating: "8.3/10",
        keyLearnings: [
            "Persistence and hard work eventually lead to success.",
            "The importance of bonds and friendship in overcoming adversity."
        ]
    },
    {
        title: "Another",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/4/75509.jpg",
        description: "A transfer student gets involved in a mystery surrounding a cursed class.",
        tags: ["Horror", "Mystery", "Slice of Life"],
        year: "2012",
        rating: "7.5/10",
        keyLearnings: [
            "Persistence and hard work eventually lead to success.",
            "The importance of bonds and friendship in overcoming adversity."
        ]
    },
    {
        title: "Mirai Nikki",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/13/33465.jpg",
        description: "Participants fight in a survival game to become the next God using future diaries.",
        tags: ["Action", "Thriller"],
        year: "2011",
        rating: "7.4/10",
        keyLearnings: [
            "Persistence and hard work eventually lead to success.",
            "The importance of bonds and friendship in overcoming adversity."
        ]
    }
];
